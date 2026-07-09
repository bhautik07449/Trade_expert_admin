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
    { field: "department", headerName: "Department" },
    { field: "act_details", headerName: "Act Details" },
    { field: "more_details", headerName: "More Details" },
    { field: "country", headerName: "Country" },
    { field: "usefull_when", headerName: "Useful When" },
    { 
        field: "use_case", 
        headerName: "Use Case",
        renderCell: (params) => {
            if (!params.value) return "-";
            const match = params.value.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
            if (match) {
                return (
                    <a href={params.value} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline inline-flex items-center gap-1 mt-2">
                        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                        Watch Video
                    </a>
                )
            }
            return <a href={params.value} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline mt-2 inline-block">Link</a>;
        }
    },
    { field: "createdAt", headerName: "Created" },
]

export default function TradeLaw() {
    const [list, setList] = useState([])
    const navigate = useNavigate();
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const getList = async (country) => {
        try {
            const res = await TradeBureauService.getTradeLawList(country)
            if (res) {
                const formattedData = res?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData)
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Trade Law List Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getList(selectedCountry)
    }, [selectedCountry])

    const handledelete = async (id) => {
        try {
            const res = await TradeBureauService.deleteTradeLaw(id)
            if (res) {
                getList(selectedCountry)
                toast({
                    variant: "success",
                    title: "Trade Law Deleted",
                    description: res?.data?.message || "Trade Law has been deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Delete Trade Law Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/trade_bureau/trade_law/edit/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Trade Law</h3>
                <h4 className="h6-bold">Total: {list.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/trade_bureau/trade_law/add')}>
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