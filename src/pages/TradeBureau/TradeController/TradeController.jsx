import { Button } from "../../../components/ui/button";
import { Card } from "../../../components/ui/card";
import CommonTable from "../../../components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../../common/constants";
import { toast } from "../../../components/ui/use-toast";
import { useSelector } from "react-redux";
import TradeBureauService from "../../../service/tradebureau.service";

const columns = [
    { field: "SrNo", headerName: "SrNo", width: 80, minWidth: 80 },
    { field: "name", headerName: "Name" },
    { field: "hsn_code", headerName: "HSN Code" },
    { field: "category", headerName: "Category" },
    { field: "description", headerName: "Description" },
    { field: "createdAt", headerName: "Created" },
]

export default function TradeController() {
    const [list, setList] = useState([])
    const navigate = useNavigate();
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const getList = async (country) => {
        try {
            const res = await TradeBureauService.getTradeControllerList(country)
            if (res) {
                const formattedData = res?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData || [])
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Trade Controller List Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getList(selectedCountry)
    }, [selectedCountry])

    const handledelete = async (id) => {
        try {
            const res = await TradeBureauService.deleteTradeController(id)
            if (res) {
                getList(selectedCountry)
                toast({
                    variant: "success",
                    title: "Trade Controller Deleted",
                    description: res?.data?.message || "Trade Controller has been deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Delete Trade Controller Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/trade_bureau/trade_controller/edit/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Trade Controller</h3>
                <h4 className="h6-bold">Total: {list.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/trade_bureau/trade_controller/add')}>
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
                />
            </Card>
        </div>
    );
}