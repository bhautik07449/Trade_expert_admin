import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import CommonTable from "../../../components/widgets/common_table";
import CommonFiltter from "../../../components/widgets/common_filter";
import ExportData from "../../../components/widgets/export_data";
import Contactservice from "../../../service/contact.service";
import { getStatusStyles } from "../../../lib/funcation";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "message", headerName: "Message", flex: 3 },
    {
        field: "status", headerName: "Status", flex: 2, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function ContactManagement() {
    const [list, setList] = useState([])
    const [search, setSearch] = useState("");
    console.log("search", search);

    const getData = async () => {
        try {
            const res = await Contactservice.getList()
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    name: item.first_name + " " + item.last_name,
                    SrNo: index + 1,
                    createdAt: new Date(item?.createdAt).toLocaleDateString(),
                }));
                setList(formattedData);
            }
        } catch (error) {
            console.log("error", error);
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
            const res = await Contactservice.deleteContact(id)
            if (res) {
                getData()
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Contact Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
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
                        <ExportData
                            data={list}
                            fileName="contact_data.xlsx"
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