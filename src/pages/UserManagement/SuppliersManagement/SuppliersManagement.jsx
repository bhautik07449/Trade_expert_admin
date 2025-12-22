import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useState } from "react";
import { CircleFadingPlus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import CommonTable from "../../../components/widgets/common_table";
import { useNavigate } from "react-router";

const categoryList = [
    { SrNo: "1", name: "Admin 1", email: "example@gmail.com", PhoneNo: "1234567889", Status: "Active", Created: "14/11/2023" },
    { SrNo: "2", name: "Admin 2", email: "example@gmail.com", PhoneNo: "1234567889", Status: "Deactive", Created: "14/11/2023" },
    { SrNo: "3", name: "Admin 3", email: "example@gmail.com", PhoneNo: "1234567889", Status: "Active", Created: "14/11/2023" },
    { SrNo: "4", name: "Admin 4", email: "example@gmail.com", PhoneNo: "1234567889", Status: "Deactive", Created: "14/11/2023" },
]

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "name", flex: 1 },
    { field: "email", headerName: "email", flex: 1 },
    { field: "PhoneNo", headerName: "PhoneNo", flex: 1 },
    { field: "Status", headerName: "Status", flex: 1 },
    { field: "Created", headerName: "Created", flex: 1 },
]
const SuppliersManagement = () => {
    
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
console.log("search", search);

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Suppliers Management</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Suppliers"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Button className="flex items-center gap-2" onClick={() => navigate('/user-management/suppliers-management/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div>
                </div>


                <CommonTable
                    columns={columns}
                    rows={categoryList || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={() => { }}
                    onDelete={() => { }}
                />
            </Card>
        </div>
    );
}

export default SuppliersManagement;