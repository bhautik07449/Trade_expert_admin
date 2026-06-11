import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import CommonTable from "../../../components/widgets/common_table";
import ExportData from "../../../components/widgets/export_data";
import CommonFiltter from "../../../components/widgets/common_filter";
import Creditaccountservice from "../../../service/creditaccount.service";
import { formatDate } from "../../../common/constants";
import { toast } from "../../../components/ui/use-toast";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "yourName", headerName: "name", flex: 1 },
    { field: "yourEmail", headerName: "Email", flex: 1 },
    { field: "yourPosition", headerName: "Position", flex: 1 },
    { field: "companyName", headerName: "Company Name", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "createdAt", headerName: "Created", flex: 1 },
]

export default function CreditAccountManagement() {
    const [list, setList] = useState([])
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const getData = async (country) => {
        try {
            const res = await Creditaccountservice.getList(country)
            if (res) {
                const formattedData = res?.data?.accounts?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    createdAt: formatDate(item?.createdAt),
                }))

                setList(formattedData)
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Inquiry",
                description: error?.response?.data?.message || "Failed to fetch credit accounts.",
            });
        }
    }

    useEffect(() => {
        getData(selectedCountry)
    }, [selectedCountry])

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

            const res = await Creditaccountservice.deleteCreditaccount(id)
            if (res) {
                toast({
                    variant: "success",
                    title: "Inquiry",
                    description: res?.data?.message,
                });
                getData(selectedCountry)
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Inquiry",
                description: error.message || "Inquiry not Deleted.",
            });
        }
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Credit Account Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-4">
                        <ExportData
                            data={list}
                            fileName="credit_account_data.xlsx"
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