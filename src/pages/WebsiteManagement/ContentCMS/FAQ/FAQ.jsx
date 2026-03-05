import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getStatusStyles } from "../../../../lib/funcation";
import Faqservice from "../../../../service/faq.service";
import { formatDate } from "../../../../common/constants";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "title", headerName: "Title", flex: 3 },
    {
        field: "answer", headerName: "Answer", flex: 3, renderCell: (params) => (
            <div
                dangerouslySetInnerHTML={{ __html: params.value }}
            />
        )
    },
    {
        field: "status", headerName: "status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function FAQ() {
    const [list, setList] = useState([])
    const navigate = useNavigate();

    const getList = async () => {
        try {
            const res = await Faqservice.getList()
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    createdAt: formatDate(item?.createdAt),
                }))
                setList(formattedData)
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getList()
    }, [])

    const handledelete = async (id) => {
        try {
            const res = await Faqservice.deleteFaq(id)
            if (res) {
                getList()
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleEdit = (row) => {
        navigate(`/website-management/content/faq/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Faqs</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/faq/add')}>
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