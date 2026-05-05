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

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "name", flex: 1 },
    { field: "category", headerName: "category", flex: 1 },
    { field: "sub_category", headerName: "sub_category", flex: 1 },
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
    const [search, setSearch] = useState("");
    const [list, setList] = useState([])
    console.log("search", search);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            const res = await DMRservice.getList()
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    category: item?.category?.name,
                    sub_category: item?.subcategory?.name,
                    createdAt: formatDate(item?.lastUpdatedAt),
                }))
                setList(formattedData);
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await DMRservice.deleteDMR(id)

            if (res) {
                getData()
            }
        } catch (error) {
            console.log("error", error);
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
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search DMR"
                            className="w-full"
                        />
                    </div>
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