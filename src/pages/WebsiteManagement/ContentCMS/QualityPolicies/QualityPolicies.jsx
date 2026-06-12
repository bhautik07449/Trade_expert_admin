import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getStatusStyles } from "../../../../lib/funcation";
import QualityPolicyservice from "../../../../service/qualityPolicy.service";
import { formatDate } from "../../../../common/constants";
import { getImageUrl } from "../../../../utils/imageUtils";
import { toast } from "../../../../components/ui/use-toast";
import FilterByCountry from "../../../../components/widgets/filterByCountry";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "country", headerName: "Country", flex: 1 },
    {
        field: "logo", headerName: "Image", flex: 2,
        renderCell: ({ row }) => (
            <img
                src={getImageUrl(row?.logo)}
                alt={row?.name}
                className="h-16 w-16 object-cover rounded p-0.5"
            />
        )
    },
    { field: "description", headerName: "Description", flex: 4 },
    {
        field: "status", headerName: "Status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function QualityPolicies() {
    const [list, setList] = useState([])
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const navigate = useNavigate();

    const getData = async (country) => {
        try {
            const res = await QualityPolicyservice.getList(country);
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    createdAt: formatDate(item.createdAt),
                }))
                setList(formattedData);
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Quality Policy",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData(selectedCountry);
    }, [selectedCountry])

    const handleDelete = async (id) => {
        try {
            const res = await QualityPolicyservice.deleteQualityPolicy(id)

            if (res) {
                getData(selectedCountry)
                toast({
                    variant: "success",
                    title: "Quality Policy",
                    description: res?.data?.message || "Deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Quality Policy",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }

    }

    const handleEdit = (row) => {
        navigate(`/website-management/pages-management/quality-policies/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Quality Policies</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/pages-management/quality-policies/add')}>
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
                    onDelete={handleDelete}
                    rowHeight={80}
                />
            </Card>
        </div>
    );
}