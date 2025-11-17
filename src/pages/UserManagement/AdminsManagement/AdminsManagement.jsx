import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useState } from "react";
import { CircleFadingPlus, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import AddEditAdmin from "./AddEditAdmin";

const categoryList = [
    { SrNo: "1", name: "Admin 1", email: "example@gmail.com", PhoneNo: "1234567889", Status: "Active", Created: "14/11/2023" },
    { SrNo: "2", name: "Admin 2", email: "example@gmail.com", PhoneNo: "1234567889", Status: "Deactive", Created: "14/11/2023" },
    { SrNo: "3", name: "Admin 3", email: "example@gmail.com", PhoneNo: "1234567889", Status: "Active", Created: "14/11/2023" },
    { SrNo: "4", name: "Admin 4", email: "example@gmail.com", PhoneNo: "1234567889", Status: "Deactive", Created: "14/11/2023" },
]

const AdminsManagement = () => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Admins Management</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Admins"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <Button className="flex items-center gap-2"
                            onClick={() => setIsOpen(true)}
                        >
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div>
                </div>


                <Table className="rounded-md">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Sr No</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {categoryList.length > 0 ? (
                            categoryList.map((item, idx) => (
                                <TableRow key={item.SrNo ?? idx}>
                                    <TableCell>{item.SrNo}</TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.PhoneNo}</TableCell>
                                    <TableCell>
                                        <span
                                            className={
                                                "inline-block px-2 py-0.5 rounded-full text-xs font-medium " +
                                                (item.Status === "Active"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-yellow-100 text-yellow-800")
                                            }
                                        >
                                            {item.Status}
                                        </span>
                                    </TableCell>
                                    <TableCell>{item.Created}</TableCell>
                                    <TableCell className="text-right">
                                        <button
                                            className="inline-flex items-center gap-2 p-2 rounded hover:bg-red-50"
                                            aria-label={`Delete ${item.name}`}
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center py-6">
                                    <p className="text-black/50 font-medium text-base">No data found</p>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={7}>
                                <div className="flex items-center justify-between py-2">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {categoryList.length} of {categoryList.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Page 1</div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Card>

            <AddEditAdmin
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            />

        </div>
    );
}


export default AdminsManagement;