import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import CommonTable from "../../../components/widgets/common_table";
import ExportData from "../../../components/widgets/export_data";
import CommonFiltter from "../../../components/widgets/common_filter";
import ResquestSampleservice from "../../../service/resquestSample.service";
import toast from "react-hot-toast";
import { formatDate } from "../../../common/constants";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "message", headerName: "Message", flex: 1 },
    { field: "businessContact", headerName: "Business Contact", flex: 1 },
    { field: "company", headerName: "company", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function RequestSamplesManagement() {
    const [list, setList] = useState([])
    const [search, setSearch] = useState("");
    console.log("search", search);

    const getData = async () => {
        try {
            const res = await ResquestSampleservice.getList()
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    createdAt: formatDate(item?.createdAt),
                }))

                setList(formattedData)
            }
        } catch (error) {
            toast.error("data not fetch")
        }
    }

    useEffect(() => {
        getData()
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
            const res = await ResquestSampleservice.deleteResquestSample(id)
            if (res) {
                toast({
                    variant: "success",
                    title: "Inquiry",
                    description: res?.data?.message,
                });
                getData()
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Inquiry",
                description: error.message || "Request Sample data not deleted.",
            });
        }
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Request Samples Management</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Request Samples"
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-4">
                        <ExportData
                            data={list}
                            fileName="request_data.xlsx"
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