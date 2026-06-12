import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../../components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../../../common/constants";
import { getImageUrl } from "../../../../utils/imageUtils";
import TradeHistoryservice from "../../../../service/tradeHistory.service";
import { toast } from "../../../../components/ui/use-toast";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    {
        field: "image", headerName: "Image", flex: 1,
        renderCell: ({ row }) => (
            <img
                src={getImageUrl(row?.image)}
                alt={row?.title}
                className="h-16 w-16 object-cover rounded p-0.5"
            />
        )
    },
    { field: "content", headerName: "Content", flex: 2 },
    { field: "year", headerName: "Year", flex: 1 },
    { field: "label", headerName: "Label", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function TradeHistory() {
    const [list, setList] = useState([])
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);
    const navigate = useNavigate();

    const getList = async (country) => {
        try {
            const res = await TradeHistoryservice.getList(country)
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    country: item?.country || "-",
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData)
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Failed to Fetch Trade History",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getList(selectedCountry)
    }, [selectedCountry])

    const handledelete = async (id) => {
        try {
            const res = await TradeHistoryservice.deleteTradeHistory(id)
            if (res) {
                getList(selectedCountry)
                toast({
                    variant: "success",
                    title: "Trade History Deleted",
                    description: res?.data?.message || "Trade history has been deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Trade History Delete Failed",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/website-management/section-management/trade-history/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Trade History</h3>
                <h4 className="h6-bold">Total: {list.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/section-management/trade-history/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
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