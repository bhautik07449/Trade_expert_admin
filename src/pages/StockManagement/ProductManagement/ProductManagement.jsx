import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Productservice from "../../../service/product.service";
import CommonTable from "../../../components/widgets/common_table";
import { useNavigate } from "react-router";
import { getStatusStyles } from "../../../lib/funcation";
import { formatDate } from "../../../common/constants";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "name", flex: 1 },
    {
        field: "description", headerName: "Description", flex: 3, renderCell: (params) => (
            <div
                dangerouslySetInnerHTML={{ __html: params.value }}
            />
        )
    },
    { field: "teriff", headerName: "Tariff", flex: 1 },
    { field: "price", headerName: "Price", flex: 1 },
    {
        field: "status", headerName: "Status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "createdAt", flex: 1 },
]

const ProductManagement = () => {
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    console.log("search", list);

    const getList = async () => {
        try {
            const res = await Productservice.getProductList();
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    createdAt: formatDate(item?.lastUpdatedAt),
                }))
                setList(formattedData);
            }

        } catch (error) {
            console.log(error, "error");
        }
    }

    useEffect(() => {
        getList()
    }, [])

    const handleDelete = async (id) => {
        try {
            const res = await Productservice.deleteProduct(id)
            if (res) {
                getList()
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleEdit = (row) => {
        navigate(`/stock-management/product_management/${row?.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Product Management</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search products"
                            className="w-full"
                        />
                    </div>
                    <div onClick={() => navigate("/stock-management/product_management/add")}>
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
export default ProductManagement;