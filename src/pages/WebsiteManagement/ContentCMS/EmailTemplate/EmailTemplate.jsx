import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../../components/widgets/common_table";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useEffect, useState } from "react";
import Emailtemplateservice from "../../../../service/emailtemplate.service";
import { useNavigate } from "react-router";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "template_name", headerName: "Template Name", flex: 2 },
    { field: "email_subject", headerName: "Email Subject", flex: 2 },
    // {
    //     field: "email_body",
    //     headerName: "Email Body",
    //     flex: 6,
    //     renderCell: (params) => (
    //         <div
    //             dangerouslySetInnerHTML={{ __html: params.value || "" }}
    //         />
    //     ),
    // }
]

export default function EmailTemplate() {
    const [list, setList] = useState([])
    const [search, setSearch] = useState("");
    const navigate = useNavigate()
    console.log("search", search);

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
            console.log(error, "error");
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
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleEdit = (row) => {
        navigate(`/website-management/content/email-template/${row.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Email Template</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Email"
                            className="w-full"
                        />
                    </div>
                </div>


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