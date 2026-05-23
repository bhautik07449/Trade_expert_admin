import { Card } from "../../../components/ui/card";
import { formatDate } from "../../../common/constants";
import MarketDevelopmentservice from "../../../service/marketdevelopment.service";
import { useEffect, useState } from "react";
import { CommonTextField } from "../../../components/widgets/common_textField";
import CommonTable from "../../../components/widgets/common_table";
import { getStatusStyles } from "../../../lib/funcation";
import toast from "react-hot-toast";
import { Toast } from "../../../components/ui/toast";

const columns = [
    { field: "SrNo", headerName: "SrNo", width: 80 },
    { field: "budget", headerName: "Budget", width: 120 },
    { field: "budget_range", headerName: "Budget Range", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "subcategory", headerName: "Sub Category", width: 150 },
    { field: "product", headerName: "Product", width: 150 },
    {
        field: "status", headerName: "Status", renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created", width: 150 },
]

export default function MarketData() {
    const [list, setList] = useState([])
    const [search, setSearch] = useState("");
    console.log("search", search);

    const getData = async () => {
        try {
            const res = await MarketDevelopmentservice.getMarketData();
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    category: item?.category_id?.name,
                    subcategory: item?.sub_category_id?.name,
                    product: item?.product_id?.name,
                    lastUpdatedAt: formatDate(item?.lastUpdatedAt),
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData);
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Market Development Data Fetch Failed",
                description: error?.response?.data?.message || "Failed to fetch market development data",
            });
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await MarketDevelopmentservice.deleteMarketData(id)

            if (res) {
                getData()
                toast({
                    variant: "success",
                    title: "Market Development Data Deleted",
                    description: res?.data?.message || "Market development data deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Market Development Data Deletion Failed",
                description: error?.response?.data?.message || "Failed to delete market development data",
            });
        }

    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Market Data</h3>
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
                </div>


                <CommonTable
                    columns={columns}
                    rows={list || []}
                    showDelete={true}
                    onDelete={handleDelete}
                />
            </Card>
        </div>
    );
}