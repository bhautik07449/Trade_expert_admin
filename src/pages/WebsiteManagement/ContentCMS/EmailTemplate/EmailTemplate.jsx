import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../../components/widgets/common_table";
import { useEffect, useState } from "react";
import Emailtemplateservice from "../../../../service/emailtemplate.service";
import { useNavigate } from "react-router";
import { toast } from "../../../../components/ui/use-toast";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "template_name", headerName: "Template Name", flex: 2 },
    { field: "email_subject", headerName: "Email Subject", flex: 2 }
]

export default function EmailTemplate() {
    const [list, setList] = useState([])
    const navigate = useNavigate()

    const getData = async () => {
        try {
            const res = await Emailtemplateservice.getList();
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                }))
                setList(formattedData);
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Email Template",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await Emailtemplateservice.deleteEmailtemplate(id)

            if (res) {
                getData()
                toast({
                    variant: "success",
                    title: "Email Template",
                    description: "Email Template deleted successfully",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Email Template",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/website-management/general-management/email-template/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Email Template</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <CommonTable
                    columns={columns}
                    rows={list || []}
                    showDelete={true}
                    onDelete={handleDelete}
                    showEdit={true}
                    onEdit={handleEdit}
                />
            </Card>
        </div>
    );
}