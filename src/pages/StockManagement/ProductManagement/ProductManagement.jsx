import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Productservice from "../../../service/product.service";
import CommonTable from "../../../components/widgets/common_table";
import { useNavigate } from "react-router";
import { getStatus } from "../../../lib/funcation";
import { formatDate } from "../../../common/constants";
import { toast } from "../../../components/ui/use-toast";
import { useSelector } from "react-redux";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "name", flex: 1 },
    { field: "country", headerName: "Country", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "subcategory", headerName: "Sub Category", flex: 1 },
    { field: "offer_type", headerName: "Offer", flex: 1 },
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
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatus(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "createdAt", headerName: "createdAt", flex: 1 },
]

const ProductManagement = () => {
    const [list, setList] = useState([]);
    const navigate = useNavigate();
    const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

    const getList = async (country) => {
        try {
            const res = await Productservice.getProductList(country);
            if (res) {
                const formattedData = res?.data?.data?.map((item, index) => ({
                    ...item,
                    SrNo: index + 1,
                    category: item?.category?.name || "-",
                    subcategory: item?.subcategory?.name || "-",
                    offer_type: item?.offer_type?.name || "-",
                    createdAt: formatDate(item?.lastUpdatedAt),
                }))
                setList(formattedData);
            }

        } catch (error) {
            toast({
                variant: "error",
                title: "Product List",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        getList(selectedCountry)
    }, [selectedCountry])

    const handleDelete = async (id) => {
        try {
            const res = await Productservice.deleteProduct(id)
            if (res) {
                getList(selectedCountry)
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Product List",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    const handleEdit = (row) => {
        navigate(`/stock-management/product-management/${row?.id}`)
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Product Management</h3>
                <h4 className="h6-bold">Total: {list?.length}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div onClick={() => navigate("/stock-management/product-management/add")}>
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