import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import CommonTable from "../../../components/widgets/common_table";
import ExportData from "../../../components/widgets/export_data";
import { toast } from "../../../components/ui/use-toast";
import InvestorrelationsService from "../../../service/investorrelations.service";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "name", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "product", headerName: "Product", flex: 4 },
    { field: "service", headerName: "Service", flex: 4 },
    { field: "country", headerName: "Country", flex: 2 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "message", headerName: "Message", flex: 4 },
    { field: "lastUpdatedAt", headerName: "Created", flex: 2 },
]

export default function Investorrelations() {
    const [list, setList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await InvestorrelationsService.getList();
                if (response && response.data) {
                    const formattedData = response?.data?.data?.map((item, index) => ({
                        ...item,
                        SrNo: index + 1,
                        product: item?.product?.name,
                        service: item?.service?.name,
                        lastUpdatedAt: new Date(item.lastUpdatedAt).toLocaleDateString(),
                    }));
                    setList(formattedData);
                }
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Investor Relations Fetch Failed",
                    description: error?.response?.data?.message || "Something went wrong",
                });
            }
        }
        fetchData();
    }, [])

    const handleDelete = async (id) => {
        try {
            await InvestorrelationsService.deleteInvestorrelations(id);
            setList(prevList => prevList.filter(item => item.id !== id));
        } catch (error) {
            toast({
                variant: "error",
                title: "Investor Relations Delete Failed",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Investor Relations</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-4">
                        <ExportData
                            data={list}
                            fileName="investor_relations.xlsx"
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