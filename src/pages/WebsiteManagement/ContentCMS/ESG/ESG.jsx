import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../../components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getStatusStyles } from "../../../../lib/funcation";
import { formatDate } from "../../../../common/constants";
import { toast } from "../../../../components/ui/use-toast";
import ESGService from "../../../../service/esg.service";
import { getImageUrl } from "../../../../utils/imageUtils";
import FilterByCountry from "../../../../components/widgets/filterByCountry";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    {
        field: "image", headerName: "Image", flex: 5,
        renderCell: ({ row }) => (
            <img
                src={getImageUrl(row?.image)}
                alt={row?.name}
                className="h-52 w-[500px] object-cover rounded p-0.5"
            />
        )
    },
    { field: "country", headerName: "Country", flex: 2 },
    { field: "category", headerName: "Category", flex: 2 },
    { field: "description", headerName: "Description", flex: 2 },
    { field: "tag", headerName: "Tag", flex: 2 },
    {
        field: "status", headerName: "Status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function ESG() {
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);
    const [list, setList] = useState([])
    const navigate = useNavigate();

    const getList = async (country) => {
        try {
            const res = await ESGService.getList(country)
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    category: item?.category?.name,
                    subcategory: item?.subcategory?.name,
                    product: item?.products?.map(p => p.name).join(", "),
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData)
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "ESG List Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getList(selectedCountry)
    }, [selectedCountry])

    const handledelete = async (id) => {
        try {
            const res = await ESGService.deleteESG(id)
            if (res) {
                getList(selectedCountry)
                toast({
                    variant: "success",
                    title: "ESG Deleted",
                    description: res?.data?.message || "ESG has been deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Delete ESG Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/website-management/content/esg/edit/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Environment Social Governance</h3>
                <h4 className="h6-bold">Total: {list.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/esg/add')}>
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
                    rowHeight={150}
                    tableHeight="800px"
                />
            </Card>
        </div>
    );
}