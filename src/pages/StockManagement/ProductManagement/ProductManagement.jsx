import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import { CircleFadingPlus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Productservice from "../../../service/product.service";
import CommonTable from "../../../components/widgets/common_table";
import { useNavigate } from "react-router";

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "name", flex: 1 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "PhoneNo", headerName: "PhoneNo", flex: 1 },
    { field: "Status", headerName: "Status", flex: 1 },
    { field: "Created", headerName: "Created", flex: 1 },
]

const ProductManagement = () => {
    const [search, setSearch] = useState("");
    const [list, setList] = useState([]);
    const navigate = useNavigate();
console.log("search", search);

    const getList = async () => {
        try {
            const res = await Productservice.getProductList();
            if (res) {
                setList(res?.data);
            }

        } catch (error) {
            console.log(error, "error");
        }
    }

    useEffect(() => {
        getList()
    }, [])

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
                    onEdit={() => { }}
                    onDelete={() => { }}
                />
            </Card>
        </div>
    );
};
export default ProductManagement;