import { Button } from "../../../../components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../../components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { formatDate } from "../../../../common/constants";
import PresencesService from "../../../../service/presences.service";
import { toast } from "../../../../components/ui/use-toast";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "country", headerName: "Country", flex: 3 },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function Presences() {
    const [list, setList] = useState([])
    const navigate = useNavigate();

    const getList = async () => {
        try {
            const res = await PresencesService.getList()
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData)
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Presences List Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getList()
    }, [])

    const handledelete = async (id) => {
        try {
            const res = await PresencesService.deletePresences(id)
            if (res) {
                getList()
                toast({
                    variant: "success",
                    title: "Delete Presences",
                    description: res?.data?.message || "Presences deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Delete Presences Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/website-management/country/presences/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Our Presence</h3>
                <h4 className="h6-bold">Total: {list.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/country/presences/add')}>
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