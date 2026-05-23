import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../../components/widgets/common_table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getStatusStyles } from "../../../../lib/funcation";
import { formatDate } from "../../../../common/constants";
import CareerService from "../../../../service/career.service";
import { toast } from "../../../../components/ui/use-toast";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "contact", headerName: "Contact", flex: 2 },
    { field: "email", headerName: "Email", flex: 3 },
    {
        field: "status", headerName: "Status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function Career() {
    const [list, setList] = useState([])
    const navigate = useNavigate();

    const getList = async () => {
        try {
            const res = await CareerService.getList()
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
                title: "career List Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getList()
    }, [])

    const handledelete = async (id) => {
        try {
            const res = await CareerService.deleteCareer(id)
            if (res) {
                getList()
                toast({
                    variant: "success",
                    title: "Career Deleted",
                    description: res?.data?.message,
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Delete Career Error",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleShow = (row) => {
        navigate(`/website-management/content/career/view/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Career</h3>
                <h4 className="h6-bold">Total: {list.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <CommonTable
                    columns={columns}
                    rows={list || []}
                    showView={true}
                    showDelete={true}
                    onDelete={handledelete}
                    onShow={handleShow}
                />
            </Card>
        </div>
    );
}