import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CommonFiltter from "../../../../components/widgets/common_filter";
import Traderequestservice from "../../../../service/traderequest.service";
import { formatDate } from "../../../../common/constants";
import { toast } from "../../../../components/ui/use-toast";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "trade_offer", headerName: "Trade Offer", flex: 3 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "phone", headerName: "Phone", flex: 2 },
    { field: "message", headerName: "Message", flex: 3 },
    { field: "type", headerName: "Type", flex: 3 },
    { field: "createdAt", headerName: "Created", flex: 2 },
]

export default function OfferRequest() {
    const [list, setList] = useState([])
    const navigate = useNavigate();

    const getList = async () => {
        try {
            const res = await Traderequestservice.getList()
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    trade_offer: item?.trade_offer?.name,
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData)
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Offer Request",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getList()
    }, [])

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
            const res = await Traderequestservice.deleteTraderequest(id)
            if (res) {
                getList()
                toast({
                    variant: "success",
                    title: "Offer Request Deleted",
                    description: res?.data?.message || "Offer Request Deleted Successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Offer Request Deletion Failed",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/website-management/content/offer_req/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Trade Offer Requests</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/offer_req/add')}>
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
                />
            </Card>
        </div>
    );
}