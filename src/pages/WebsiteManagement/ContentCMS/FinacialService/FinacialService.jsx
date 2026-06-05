import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../../../common/constants";
import { toast } from "../../../../components/ui/use-toast";
import FinancialServiceservice from "../../../../service/finacialservice.service";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "Name", flex: 4 },
    { field: "description", headerName: "Description", flex: 4 },
    { field: "country", headerName: "Country", flex: 2 },
    { field: "createdAt", headerName: "Created", flex: 1 },
    { field: "lastUpdatedAt", headerName: "Updated", flex: 1 },
]

export default function FinacialService() {
    const [list, setList] = useState([])
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const res = await FinancialServiceservice.getList();
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    lastUpdatedAt: formatDate(item?.lastUpdatedAt),
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData);
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Abc Type List Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await FinancialServiceservice.deleteFinancialService(id)

            if (res) {
                getData()
                toast({
                    variant: "success",
                    title: "Finacial Service Deleted",
                    description: res?.data?.message || "Finacial Service has been deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Delete Finacial Service Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }

    }

    const handleEdit = (row) => {
        navigate(`/website-management/content/finacial_service/edit/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Finacial Service</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/finacial_service/add')}>
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
                />
            </Card>
        </div>
    );
}