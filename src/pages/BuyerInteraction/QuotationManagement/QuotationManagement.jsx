import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import CommonTable from "../../../components/widgets/common_table";
import ExportData from "../../../components/widgets/export_data";
import CommonFiltter from "../../../components/widgets/common_filter";
import Buyerinteractionservice from "../../../service/buyerinteraction.service";
import { getStatusStyles } from "../../../lib/funcation";
import { toast } from "../../../components/ui/use-toast";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "productName", headerName: "Product Name", flex: 1 },
    { field: "businessEmail", headerName: "Email", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "sub_category", headerName: "Sub Category", flex: 1 },
    {
        field: "status", headerName: "Status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function QuotationManagement() {
    const [search, setSearch] = useState("");
    console.log("search", search);

    const [list, setList] = useState([]);

    const fetchData = async () => {
        try {
            const response = await Buyerinteractionservice.getQuotation();
            if (response && response.data) {
                const formattedData = response?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    category: item?.category?.name,
                    sub_category: item?.subCategory?.name,
                    createdAt: new Date(item.createdAt).toLocaleDateString(),
                }));
                setList(formattedData);
            }
        } catch (error) {
            console.error("Error fetching buyer list:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

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

    const handleDelete = async (id) => {
        try {
            const res = await Buyerinteractionservice.deleteQuo(id)
            if (res) {
                toast({
                    variant: "success",
                    title: "Inquiry",
                    description: res?.data?.message,
                });
                fetchData()
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Inquiry",
                description: error.message || "Quotation data not deleted.",
            });
        }
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Quotation Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Quotations"
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-4">
                        <ExportData
                            data={list}
                            fileName="quotation_data.xlsx"
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
                    showDelete={true}
                    onDelete={handleDelete}
                />
            </Card>
        </div>
    );
}