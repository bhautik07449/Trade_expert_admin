import React, { useState } from "react";
import CommonButton from "../../../components/widgets/common_button";
import { CommonTextField } from "../../../components/widgets/common_textField";
import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";
import CommonBox from "../../../components/common/common_box";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import Supplierservice from "../../../service/suppliers.service";

const AddEditSuppliers = () => {
    const roles = [
        { label: "Manufacturer", value: "Manufacturer" },
        { label: "Trader", value: "Trader" },
        { label: "Agent", value: "Agent" },
    ];

    const navigate = useNavigate()

    const initialValues = {
        firstName: "",
        lastName: "",
        firmName: "",
        email: "",
        website: "",
        phone: "",
        city: "",
        state: "",
        address: "",
        supplierType: "",
        productCategory: "",
        products: "",
        productStatus: "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        firmName: Yup.string().required("Firm Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        website: Yup.string().required("Website is required"),
        phone: Yup.string().matches(/^[0-9]+$/, "Phone number must be digits"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        address: Yup.string().required("Address is required"),
        productStatus: Yup.string().required("Product Status is required"),
        supplierType: Yup.string().required("Supplier Type is required"),
        productCategory: Yup.string().required("Product Category is required"),
        products: Yup.string().required("Products is required"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log("values", values);

            setSubmitting(true);
            try {
                const response = await Supplierservice.addSuppliers(values)
                if (response) {
                    navigate("/user-management/suppliers-management")
                }
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
                            onBlur={formik.handleBlur}
                            error={formik.touched.firstName && formik.errors.firstName}

                        />
                        <CommonTextField
                            label="Last Name"
                            placeholder="Enter Last Name"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lastName && formik.errors.lastName}
                        />
                        <CommonTextField
                            label="Firm Name"
                            placeholder="Enter Firm Name"
                            name="firmName"
                            value={formik.values.firmName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.firmName && formik.errors.firmName}
                        />
                        <CommonTextField
                            label="Email"
                            placeholder="Enter Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email}
                        />

                        <CommonTextField
                            label="Website"
                            placeholder="Enter Website"
                            name="website"
                            value={formik.values.website}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.website && formik.errors.website}
                        />

                        <CommonTextField
                            label="Phone No"
                            placeholder="Enter Phone No"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.phone && formik.errors.phone}
                        />

                        <CommonTextField
                            label="City"
                            placeholder="Enter City"
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.city && formik.errors.city}
                        />

                        <CommonTextField
                            label="State"
                            placeholder="Enter State"
                            name="state"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && formik.errors.state}
                        />

                        <div className="md:col-span-2">
                            <CommonTextField
                                type="textarea"
                                label="Address"
                                placeholder="Enter Address"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address && formik.errors.address}
                            />
                        </div>

                        <CommonBox
                            label="Product Status"
                            placeholders="Select Product Status"
                            options={roles}
                            value={formik.values.productStatus}
                            onChange={(value) => formik.setFieldValue("productStatus", value)}
                            error={formik.touched.productStatus && formik.errors.productStatus}
                        />

                        <CommonBox
                            label="Supplier Type"
                            placeholders="Select Supplier Type"
                            options={roles}
                            value={formik.values.supplierType}
                            onChange={(value) => formik.setFieldValue("supplierType", value)}
                            error={formik.touched.supplierType && formik.errors.supplierType}
                        />

                        <CommonTextField
                            label="Product Category"
                            placeholder="Enter Product Category"
                            name="productCategory"
                            value={formik.values.productCategory}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.productCategory && formik.errors.productCategory}
                        />

                        <CommonTextField
                            label="Products"
                            placeholder="Enter Products"
                            name="products"
                            value={formik.values.products}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.products && formik.errors.products}
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