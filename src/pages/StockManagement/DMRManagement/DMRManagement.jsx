import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import CommonTable from "../../../components/widgets/common_table";
import { useNavigate } from "react-router";
import { getStatusStyles } from "../../../lib/funcation";
import DMRservice from "../../../service/dmr.service";
import { formatDate } from "../../../common/constants";
import { toast } from "../../../components/ui/use-toast";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "name", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
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

const DMRManagement = () => {
    const [list, setList] = useState([])
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const navigate = useNavigate();

    const getData = async (country) => {
        try {
            const res = await DMRservice.getList(country)
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    category: item?.category?.name,
                    country: item?.category?.country,
                    sub_category: item?.subcategory?.name,
                    createdAt: formatDate(item?.lastUpdatedAt),
                }))
                setList(formattedData);
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "DMR",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getData(selectedCountry)
    }, [selectedCountry])

    const handleDelete = async (id) => {
        try {
            const res = await DMRservice.deleteDMR(id)

            if (res) {
                getData(selectedCountry)
                toast({
                    variant: "success",
                    title: "DMR",
                    description: res?.data?.message || "Something went wrong",
                });
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "DMR",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/stock-management/dmr-management/${row?.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">DMR Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div onClick={() => navigate("/stock-management/dmr-management/add")}>
                        <Button className="flex items-center gap-2">
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div>
                </div>


                <CommonTable
                    columns={columns}
                    rows={list || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </Card>
        </div>
    );
};
export default DMRManagement;