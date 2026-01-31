import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Currency = [
    { SrNo: 1, Title: "JMD", Answer: "sourceseas.itcoders.in", status: "Active", Created: "14/11/2023" },
    { SrNo: 2, Title: "INR", Answer: "sourceseas.itcoders.in", status: "Deactive", Created: "14/11/2023" },
    { SrNo: 3, Title: "SGD", Answer: "sourceseas.itcoders.in", status: "Active", Created: "14/11/2023" },
    { SrNo: 4, Title: "AED", Answer: "sourceseas.itcoders.in", status: "Deactive", Created: "14/11/2023" },
]

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "Title", headerName: "Title", flex: 3 },
    { field: "Answer", headerName: "Answer", flex: 3 },
    { field: "status", headerName: "status", flex: 1 },
    { field: "Created", headerName: "Created", flex: 1 },
]

export default function FAQ() {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    console.log("search", search);

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