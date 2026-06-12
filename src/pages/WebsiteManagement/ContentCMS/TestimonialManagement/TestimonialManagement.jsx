import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CommonFiltter from "../../../../components/widgets/common_filter";
import { getStatusStyles } from "../../../../lib/funcation";
import Testimonialservice from "../../../../service/testimonial.service";
import { formatDate } from "../../../../common/constants";
import { getImageUrl } from "../../../../utils/imageUtils";
import { toast } from "../../../../components/ui/use-toast";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    {
        field: "image", headerName: "Image", flex: 1,
        renderCell: ({ row }) => (
            <img
                src={getImageUrl(row?.image)}
                alt={row?.name}
                className="h-16 w-16 object-cover rounded p-0.5"
            />
        )
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "review", headerName: "Review", flex: 2 },
    { field: "country", headerName: "Country", flex: 2 },
    {
        field: "status", headerName: "Status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function TestimonialManagement() {
    const [list, setList] = useState([])
    const navigate = useNavigate();
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const getList = async (country) => {
        try {
            const res = await Testimonialservice.getList(country)
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    image: item?.client?.image,
                    name: item?.client?.first_name + " " + item?.client?.last_name,
                    country: item?.client?.country,
                    email: item?.client?.email,
                    category: item?.category?.name,
                    createdAt: formatDate(item?.lastUpdatedAt),
                }))
                setList(formattedData)
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Testimonial Details",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getList(selectedCountry)
    }, [selectedCountry])

    const filterData = [
        { type: "text", placeholder: "Name", label: "Name" },
        { type: "text", placeholder: "Rate", label: "Rate" },
    ]

    const handleApplyFilters = (filters) => {
        console.log("Applied Filters:", filters);
    }

    const handleClearFilters = () => {
        console.log("Filters Cleared");
    }

    const handledelete = async (id) => {
        try {
            const res = await Testimonialservice.deleteTestimonial(id)
            if (res) {
                getList(selectedCountry)
                toast({
                    variant: "success",
                    title: "Testimonial Details",
                    description: res?.data?.message || "Testimonial deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Testimonial Details",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/website-management/section-management/testinomial/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Testimonial Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/section-management/testinomial/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                        <CommonFiltter
                            filterData={filterData}
                            onApplyFilters={handleApplyFilters}
                            onClearFilters={handleClearFilters}
                        />
                    </div>
                </div>


                <CommonTable
                    columns={columns}
                    rows={list || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={handleEdit}
                    onDelete={handledelete}
                    rowHeight={80}
                />
            </Card>
        </div>
    );
}