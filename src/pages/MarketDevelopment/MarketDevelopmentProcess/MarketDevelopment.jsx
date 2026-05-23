import { Card } from "../../../components/ui/card";
import { formatDate } from "../../../common/constants";
import MarketDevelopmentservice from "../../../service/marketdevelopment.service";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { CommonTextField } from "../../../components/widgets/common_textField";
// import { CircleFadingPlus } from "lucide-react";
import CommonTable from "../../../components/widgets/common_table";
// import { Button } from "../../components/ui/button";
import { getStatusStyles } from "../../../lib/funcation";

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
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    console.log("search", search);

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
            console.log(error, "error");
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleEdit = (row) => {
        navigate(`/market-development/process/edit/${row?.id}`)
    }

    const handleDelete = async (id) => {
        try {
            const res = await MarketDevelopmentservice.deleteMarketDevelopment(id)

            if (res) {
                getData()
            }
        } catch (error) {
            console.log("error", error);
        }

    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Market Development</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Market Development"
                            className="w-full"
                        />
                    </div>
                    {/* <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/market-development/process/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div> */}
                </div>


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