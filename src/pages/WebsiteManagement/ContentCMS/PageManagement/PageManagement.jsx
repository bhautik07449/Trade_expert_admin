import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CommonTextField } from "../../../..//components/widgets/common_textField";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import CommonFiltter from "../../../../components/widgets/common_filter";
import { getStatusStyles } from "../../../../lib/funcation";

const Pages = [
    { Url: "bout-knowus-page", name: "bout-knowus-page", Title: "about-knowus-page", Meta_Title: "about-knowus-page", Meta_Keyword: "about-knowus-page", status: "Active", Added_On: "14/11/2023" },
    { Url: "build-career-with-sourceseas", name: "build-career-with-sourceseas", Title: "Build Career With Sourceseas	", Meta_Title: "Build Career With Sourceseas", Meta_Keyword: "Build Career With Sourceseas", status: "Deactive", Added_On: "14/11/2023" },
    { Url: "contactus-page", name: "contactus-page", Title: "contactus-page", Meta_Title: "contactus-page", Meta_Keyword: "contactus-page", status: "Active", Added_On: "14/11/2023" },
    { Url: "csr", name: "csr", Title: "CSR", Meta_Title: "CSR", Meta_Keyword: "CSR", status: "Deactive", Added_On: "14/11/2023" },
]

const columns = [
    { field: "Url", headerName: "Url", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "Title", headerName: "Title", flex: 1 },
    { field: "Meta_Title", headerName: "Meta Title", flex: 1 },
    { field: "Meta_Keyword", headerName: "Meta Keyword", flex: 1 },
    { field: "status", headerName: "Status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        ) },
    { field: "Added_On", headerName: "Added On", flex: 1 },
]

export default function PageManagement() {
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
                <h3 className="h4-bold">Pages</h3>
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
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/pages/add')}>
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
                    rows={Pages || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={() => { }}
                    onDelete={() => { }}
                />
            </Card>
        </div>
    );
}