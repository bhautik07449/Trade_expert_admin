import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import CommonTable from "../../../components/widgets/common_table";
import CommonFiltter from "../../../components/widgets/common_filter";
import ExportData from "../../../components/widgets/export_data";
import Buyerservice from "../../../service/buyer.service";
import { getStatusStyles } from "../../../lib/funcation";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "name", flex: 2 },
    { field: "businessType", headerName: "Business Type", flex: 2 },
    { field: "companyName", headerName: "Company Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 3 },
    { field: "phone", headerName: "Phone", flex: 3 },
    {
        field: "status", headerName: "Status", flex: 2, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "lastUpdatedAt", headerName: "Created", flex: 2 },
]

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

export default function BuyerManagement() {
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Buyerservice.getList();
                if (response && response.data) {
                    const formattedData = response.data.map((item, index) => ({
                        ...item,
                        name: item.firstName + " " + item.lastName,
                        SrNo: index + 1,
                        lastUpdatedAt: new Date(item.lastUpdatedAt).toLocaleDateString(),
                    }));
                    setList(formattedData);
                }
            } catch (error) {
                console.error("Error fetching buyer list:", error);
            }
        }
        fetchData();
    }, [])

    const handleDelete = async (id) => {
        try {
            await Buyerservice.deleteBuyer(id);
            setList(prevList => prevList.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error deleting buyer:", error);
        }
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Buyer Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search buyers"
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-4">
                        <ExportData
                            data={list}
                            fileName="buyer_data.xlsx"
                        />
                        <CommonFiltter
                            filterData={filterData}
                            onApplyFilters={handleApplyFilters}
                            onClearFilters={handleClearFilters}
                        />
                    </div>
                </div>

                <CommonTable
                    columns={columns}
                    rows={list || []}
                    showEdit={false}
                    showDelete={true}
                    onEdit={() => { }}
                    onDelete={handleDelete}
                />
            </Card>
        </div>
    );
};