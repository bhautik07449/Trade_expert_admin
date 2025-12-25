import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CommonTextField } from "../../../..//components/widgets/common_textField";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import CommonFiltter from "../../../../components/widgets/common_filter";

const Newsletter = [
    { SrNo: 1, Email: "horosinoleg@gmail.com", Subscribe_Date: "14/11/2023", Unsubscribe_Date: "14/11/2023" },
    { SrNo: 2, Email: "horosinoleg@gmail.com", Subscribe_Date: "14/11/2023", Unsubscribe_Date: "14/11/2023" },
    { SrNo: 3, Email: "horosinoleg@gmail.com", Subscribe_Date: "14/11/2023", Unsubscribe_Date: "14/11/2023" },
    { SrNo: 4, Email: "horosinoleg@gmail.com", Subscribe_Date: "14/11/2023", Unsubscribe_Date: "14/11/2023" },
]

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "Email", headerName: "Email", flex: 6 },
    { field: "Subscribe_Date", headerName: "Subscribe_Date", flex: 2 },
    { field: "Unsubscribe_Date", headerName: "Unsubscribe_Date", flex: 2 }
]

export default function NewsletterManagement() {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    console.log("search", search);

    const filterData = [
        { type: "text", placeholder: "Name", label: "Name" },
        { type: "text", placeholder: "Rate", label: "Rate" },
    ]

    const handleApplyFilters = (filters) => {
        console.log("Applied Filters:", filters);
    }

    const handleClearFilters = () => {
        console.log("Filters Cleared");
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Newsletter Management</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Currency"
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/currency/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                        <CommonFiltter
                            filterData={filterData}
                            onApplyFilters={handleApplyFilters}
                            onClearFilters={handleClearFilters}
                        />
                    </div>
                </div>


                <CommonTable
                    columns={columns}
                    rows={Newsletter || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={() => { }}
                    onDelete={() => { }}
                />
            </Card>
        </div>
    );
}