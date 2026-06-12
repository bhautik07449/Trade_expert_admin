import { Card } from "../../../components/ui/card";
import { formatDate } from "../../../common/constants";
import MarketDevelopmentservice from "../../../service/marketdevelopment.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import CommonTable from "../../../components/widgets/common_table";
import { getStatusStyles } from "../../../lib/funcation";
import { toast } from "../../../components/ui/use-toast";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "stages", headerName: "Stages", flex: 2 },
    { field: "processSteps", headerName: "Process Steps", flex: 2 },
    {
        field: "status", headerName: "Status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function MarketDevelopment() {
    const [list, setList] = useState([])
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const res = await MarketDevelopmentservice.getList();
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    stages: item?.market_data?.stages?.map((stage) => stage?.name)?.join(", "),
                    processSteps: item?.market_data?.processSteps?.map((step) => step?.label)?.join(", "),
                    lastUpdatedAt: formatDate(item?.lastUpdatedAt),
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData);
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Market Development Process Fetch Failed",
                description: error?.response?.data?.message || "Failed to fetch market development process data",
            });
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleEdit = (row) => {
        navigate(`/website-management/section-management/process/edit/${row?.id}`)
    }

    const handleDelete = async (id) => {
        try {
            const res = await MarketDevelopmentservice.deleteMarketDevelopment(id)

            if (res) {
                getData()
                toast({
                    variant: "success",
                    title: "Market Development Process Deleted",
                    description: res?.data?.message || "Market Development Process has been deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Market Development Process Delete Failed",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }

    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Market Development</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <CommonTable
                    columns={columns}
                    rows={list || []}
                    showDelete={true}
                    showEdit={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Card>
        </div>
    );
}