import React, { useState } from "react";
import CommonButton from "../../../components/widgets/common_button";
import { CommonTextField } from "../../../components/widgets/common_textField";
import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";
import CommonBox from "../../../components/common/common_box";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const AddEditSuppliers = () => {
    const roles = [
        { label: "Indenting", value: "Indenting" },
        { label: "On-behalf", value: "On-behalf" },
    ];

    const navigate = useNavigate()

    const initialValues = {
        firstName: "",
        lastName: "",
        firmName: "",
        email: "",
        website: "",
        phoneNo: "",
        city: "",
        state: "",
        address: "",
        productStatus: "",
        supplierType: "",
        productCategory: "",
        products: "",
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log("values",values);
            
            setSubmitting(true);
            try {
                navigate("/user-management/suppliers-management")
            } catch (error) {
                console.log("error", error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">Add Supplier</h3>
            </div>

            <Card className="p-6">
                <form
                    onSubmit={formik.handleSubmit}
                    className="grid gap-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CommonTextField
                            label="First Name"
                            placeholder="Enter First Name"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}

                        />
                        <CommonTextField
                            label="Last Name"
                            placeholder="Enter Last Name"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />

                        <CommonTextField
                            label="Firm Name"
                            placeholder="Enter Firm Name"
                            name="firmName"
                            value={formik.values.firmName}
                            onChange={formik.handleChange}
                        />

                        <CommonTextField
                            label="Email"
                            placeholder="Enter Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />

                        <CommonTextField
                            label="Website"
                            placeholder="Enter Website"
                            name="website"
                            value={formik.values.website}
                            onChange={formik.handleChange}
                        />

                        <CommonTextField
                            label="Phone No"
                            placeholder="Enter Phone No"
                            name="phoneNo"
                            value={formik.values.phoneNo}
                            onChange={formik.handleChange}
                        />

                        <CommonTextField
                            label="City"
                            placeholder="Enter City"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                        />

                        <CommonTextField
                            label="State"
                            placeholder="Enter State"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                        />

                        <div className="md:col-span-2">
                            <CommonTextField
                                type="textarea"
                                label="Address"
                                placeholder="Enter Address"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <CommonBox
                            label="Product Status"
                            placeholders="Select Product Status"
                            options={roles}
                            value={formik.values.productStatus}
                            onChange={(value) => formik.setFieldValue("productStatus", value)}
                        />

                        <CommonBox
                            label="Supplier Type"
                            placeholders="Select Supplier Type"
                            options={roles}
                            value={formik.values.supplierType}
                            onChange={(value) => formik.setFieldValue("supplierType", value)}
                        />

                        <CommonTextField
                            label="Product Category"
                            placeholder="Enter Product Category"
                            name="productCategory"
                            value={formik.values.productCategory}
                            onChange={formik.handleChange}
                        />

                        <CommonTextField
                            label="Products"
                            placeholder="Enter Products"
                            name="products"
                            value={formik.values.products}
                            onChange={formik.handleChange}
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