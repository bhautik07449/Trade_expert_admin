import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CommonTextField } from "../../../..//components/widgets/common_textField";
import { useState } from "react";

const Currency = [
    { SrNo: 1, name: "activation_mail", Subject: "Please verify your email address on {SITE_NAME}", Created: "14/11/2023" },
    { SrNo: 2, name: "contact_us", Subject: "Contact us mail from {NAME}", Created: "14/11/2023" },
    { SrNo: 3, name: "activation_mail", Subject: "Please verify your email address on {SITE_NAME}", Created: "14/11/2023" },
    { SrNo: 4, name: "contact_us", Subject: "Contact us mail from {NAME}", Created: "14/11/2023" },
    { SrNo: 5, name: "activation_mail", Subject: "Please verify your email address on {SITE_NAME}", Created: "14/11/2023" },
    { SrNo: 6, name: "contact_us", Subject: "Contact us mail from {NAME}", Created: "14/11/2023" },
    { SrNo: 7, name: "activation_mail", Subject: "Please verify your email address on {SITE_NAME}", Created: "14/11/2023" },
    { SrNo: 8, name: "contact_us", Subject: "Contact us mail from {NAME}", Created: "14/11/2023" },
    { SrNo: 9, name: "activation_mail", Subject: "Please verify your email address on {SITE_NAME}", Created: "14/11/2023" },
    { SrNo: 10, name: "contact_us", Subject: "Contact us mail from {NAME}", Created: "14/11/2023" },
    { SrNo: 11, name: "activation_mail", Subject: "Please verify your email address on {SITE_NAME}", Created: "14/11/2023" },
    { SrNo: 12, name: "contact_us", Subject: "Contact us mail from {NAME}", Created: "14/11/2023" },
]

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "Name", flex: 3 },
    { field: "Subject", headerName: "Subject", flex: 5 },
    { field: "Created", headerName: "Created", flex: 1 },
]

export default function EmailTemplate() {
    const [search, setSearch] = useState("");
    console.log("search", search);

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Email Template</h3>
                <h4 className="h6-bold">Total: 12</h4>
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
                    rows={Currency || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={() => { }}
                    onDelete={() => { }}
                />
            </Card>
        </div>
    );
}