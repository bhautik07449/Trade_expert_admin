import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CommonTextField } from "../../../..//components/widgets/common_textField";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import CommonFiltter from "../../../../components/widgets/common_filter";

const Currency = [
    { SrNo: 1, name: "Joymagti bay", image: "https://sourceseas.itcoders.in/img/no-image.png", email: "	joymagtibay@alnaslllc.com", Phone_No: "1234567889", status: "Active", Created: "14/11/2023" },
    { SrNo: 2, name: "Joymagti bay", image: "https://sourceseas.itcoders.in/img/no-image.png", email: "	joymagtibay@alnaslllc.com", Phone_No: "1234567889", status: "Deactive", Created: "14/11/2023" },
    { SrNo: 3, name: "Joymagti bay", image: "https://sourceseas.itcoders.in/img/no-image.png", email: "	joymagtibay@alnaslllc.com", Phone_No: "1234567889", status: "Active", Created: "14/11/2023" },
    { SrNo: 4, name: "Joymagti bay", image: "https://sourceseas.itcoders.in/img/no-image.png", email: "	joymagtibay@alnaslllc.com", Phone_No: "1234567889", status: "Deactive", Created: "14/11/2023" },
]

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    {
        field: "image", headerName: "Image", flex: 2,
        renderCell: ({ row }) => (
            <img
                src={row?.image}
                alt={row?.name}
                className="h-16 w-16 object-cover rounded p-0.5"
            />
        )
    },
    { field: "name", headerName: "Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 4 },
    { field: "Phone_No", headerName: "Phone No.", flex: 2 },
    { field: "status", headerName: "Status", flex: 2 },
    { field: "Created", headerName: "Created", flex: 2 },
]

export default function ClientManagement() {

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
                <h3 className="h4-bold">Client Management</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Client"
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/client/add')}>
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
                    rows={Currency || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={() => { }}
                    onDelete={() => { }}
                    rowHeight={80}
                />
            </Card>
        </div>
    );
}