import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CommonFiltter from "../../../../components/widgets/common_filter";
import { getStatusStyles } from "../../../../lib/funcation";
import Clientservice from "../../../../service/client.service";
import { formatDate } from "../../../../common/constants";
import { getImageUrl } from "../../../../utils/imageUtils";
import { toast } from "../../../../components/ui/use-toast";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    {
        field: "image", headerName: "Image", flex: 2,
        renderCell: ({ row }) => (
            <img
                src={getImageUrl(row?.image)}
                alt={row?.name}
                className="h-16 w-16 object-cover rounded p-0.5"
            />
        )
    },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 4 },
    { field: "phone", headerName: "Phone No.", flex: 2 },
    { field: "country", headerName: "Country", flex: 2 },
    {
        field: "status", headerName: "Status", flex: 2, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created", flex: 2 },
]

export default function ClientManagement() {
    const [list, setList] = useState([])
    const navigate = useNavigate();
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const getData = async (country) => {
        try {
            const res = await Clientservice.getList(country);
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    name: item?.first_name + " " + item?.last_name,
                    createdAt: formatDate(item.createdAt),
                }))
                setList(formattedData);
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Client List",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData(selectedCountry)
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

    const handleDelete = async (id) => {
        try {
            const res = await Clientservice.deleteClient(id)

            if (res) {
                getData(selectedCountry)
                toast({
                    variant: "success",
                    title: "Client List",
                    description: res?.data?.message || "Client deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Client List",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }

    }

    const handleEdit = (row) => {
        navigate(`/website-management/section-management/client/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Client Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/section-management/client/add')}>
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
                    onDelete={handleDelete}
                    rowHeight={80}
                />
            </Card>
        </div>
    );
}