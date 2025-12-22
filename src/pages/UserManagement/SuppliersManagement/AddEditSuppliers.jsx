import React, { useState } from "react";
import CommonButton from "../../../components/widgets/common_button";
import { CommonTextField } from "../../../components/widgets/common_textField";
import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";
import CommonBox from "../../../components/common/common_box";

const AddEditSuppliers = () => {
    const roles = [
        { label: "Indenting", value: "Indenting" },
        { label: "On-behalf", value: "On-behalf" },
    ];

    const [productStatus, setProductStatus] = useState("");
    const [supplierType, setSupplierType] = useState("");

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">Add Supplier</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CommonTextField
                            label="First Name"
                            placeholder="Enter First Name"
                        />
                        <CommonTextField
                            label="Last Name"
                            placeholder="Enter Last Name"
                        />

                        <CommonTextField
                            label="Firm Name"
                            placeholder="Enter Firm Name"
                        />

                        <CommonTextField
                            label="Email"
                            placeholder="Enter Email"
                        />

                        <CommonTextField
                            label="Website"
                            placeholder="Enter Website"
                        />

                        <CommonTextField
                            label="Phone No"
                            placeholder="Enter Phone No"
                        />

                        <CommonTextField
                            label="City"
                            placeholder="Enter City"
                        />

                        <CommonTextField
                            label="State"
                            placeholder="Enter State"
                        />

                        <div className="md:col-span-2">
                            <CommonTextField
                                type="textarea"
                                label="Address"
                                placeholder="Enter Address"
                            />
                        </div>

                        <CommonBox
                            label="Product Status"
                            placeholders="Select Product Status"
                            options={roles}
                            value={productStatus}
                            onChange={setProductStatus}
                        />

                        <CommonBox
                            label="Supplier Type"
                            placeholders="Select Supplier Type"
                            options={roles}
                            value={supplierType}
                            onChange={setSupplierType}
                        />

                        <CommonTextField
                            label="Product Category"
                            placeholder="Enter Product Category"
                        />

                        <CommonTextField
                            label="Products"
                            placeholder="Enter Products"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton type="button" variant="outline">
                            Cancel
                        </CommonButton>

                        <CommonButton type="submit">
                            Add Supplier
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddEditSuppliers;