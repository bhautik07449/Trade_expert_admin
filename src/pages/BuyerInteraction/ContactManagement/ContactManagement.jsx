import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useState } from "react";
import CommonTable from "../../../components/widgets/common_table";
import { useNavigate } from "react-router";
import CommonButton from "../../../components/widgets/common_button";
import { FaFileExport } from "react-icons/fa6";
import CommonFiltter from "../../../components/widgets/common_filter";

const DmrList = [
    { SrNo: "1", name: "Admin 1", category: "Agri & Foods", sub_category: "Fresh Produces", Status: "Active", Created: "14/11/2023" },
    { SrNo: "2", name: "Admin 2", category: "Agri & Foods", sub_category: "Fresh Produces", Status: "Deactive", Created: "14/11/2023" },
    { SrNo: "3", name: "Admin 3", category: "Agri & Foods", sub_category: "Fresh Produces", Status: "Active", Created: "14/11/2023" },
    { SrNo: "4", name: "Admin 4", category: "Agri & Foods", sub_category: "Fresh Produces", Status: "Deactive", Created: "14/11/2023" },
]

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "name", flex: 1 },
    { field: "category", headerName: "category", flex: 1 },
    { field: "sub_category", headerName: "sub_category", flex: 1 },
    { field: "Status", headerName: "Status", flex: 1 },
    { field: "Created", headerName: "Created", flex: 1 },
]

export default function ContactManagement() {
    const [search, setSearch] = useState("");
    console.log("search", search);

    const filterData = [
        { type: "text", placeholder: "Buyer Name", label: "Buyer Name" },
        { type: "text", placeholder: "Category", label: "Category" },
        { type: "text", placeholder: "Status", label: "Status" },
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
                <h3 className="h4-bold">Contact Management</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Contacts"
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-4">
                        <CommonButton
                            variant="outline"
                            size="sm"
                            aria-label="Open Filters"
                        >
                            <div className="flex items-center gap-2">
                                <FaFileExport className="text-sm" />
                                <span className="hidden md:inline">Export data</span>
                            </div>
                        </CommonButton>
                        <CommonFiltter
                            filterData={filterData}
                            onApplyFilters={handleApplyFilters}
                            onClearFilters={handleClearFilters}
                        />
                    </div>
                </div>

                <CommonTable
                    columns={columns}
                    rows={DmrList || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={() => { }}
                    onDelete={() => { }}
                />
            </Card>
        </div>
    );
}