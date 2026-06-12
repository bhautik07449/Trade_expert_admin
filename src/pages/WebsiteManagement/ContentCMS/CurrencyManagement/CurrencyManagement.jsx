import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../../components/widgets/common_table";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CommonFiltter from "../../../../components/widgets/common_filter";
import Cuurrencyservice from "../../../../service/currency.service";
import { formatDate } from "../../../../common/constants";
import { getImageUrl } from "../../../../utils/imageUtils";
import { toast } from "../../../../components/ui/use-toast";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
        field: "image", headerName: "Image", flex: 1,
        renderCell: ({ row }) => (
            <img
                src={getImageUrl(row?.image)}
                alt={row?.name}
                className="h-10 w-10 object-cover rounded p-0.5"
            />
        )
    },
    { field: "symbol", headerName: "Sybmol", flex: 1 },
    { field: "rate", headerName: "Rate", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function CurrencyManagement() {
    const [list, setList] = useState([])
    const navigate = useNavigate();
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const filterData = [
        { type: "text", placeholder: "Name", label: "Name" },
        { type: "text", placeholder: "Rate", label: "Rate" },
    ]

    const getList = async (country) => {
        try {
            const res = await Cuurrencyservice.getList(country)
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData);
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Currency Fetching Failed",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getList(selectedCountry)
    }, [selectedCountry])

    const handleApplyFilters = (filters) => {
        console.log("Applied Filters:", filters);
    }

    const handleClearFilters = () => {
        console.log("Filters Cleared");
    }

    const handleDelete = async (id) => {
        try {
            const res = await Cuurrencyservice.deleteCurrency(id)
            if (res) {
                navigate('/website-management/general-management/currency')
                getList(selectedCountry)
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Currency Deletion Failed",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/website-management/general-management/currency/${row.id}`)
    }
    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Currency Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/general-management/currency/add')}>
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