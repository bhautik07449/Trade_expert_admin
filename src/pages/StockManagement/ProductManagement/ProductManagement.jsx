import { CommonTextField } from "../../../components/widgets/common_textField";
import { Card } from "../../../components/ui/card";
import React, { useEffect, useState } from "react";
import { CircleFadingPlus, Trash2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../../../components/ui/table";
import Productservice from "../../../service/product.service";

const ProductManagement = () => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [list, setList] = useState([]);

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
    }, [isOpen])

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
                    <div>
                        <Button className="flex items-center gap-2">
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
                            <TableHead>Description</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Tariff</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Created</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {list?.length > 0 ? (
                            list?.map((item, idx) => (
                                <TableRow key={item.SrNo ?? idx}>
                                    <TableCell>{item.SrNo}</TableCell>
                                    <TableCell className="font-medium">{item.name}</TableCell>
                                    <TableCell>{item.Description}</TableCell>
                                    <TableCell>{item.Category}</TableCell>
                                    <TableCell>{item.Tariff}</TableCell>
                                    <TableCell>{item.price}</TableCell>
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
                                        Showing {list?.length} of {list?.length}
                                    </div>
                                    <div className="text-sm text-muted-foreground">Page 1</div>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Card>
        </div>
    );
};
export default ProductManagement;