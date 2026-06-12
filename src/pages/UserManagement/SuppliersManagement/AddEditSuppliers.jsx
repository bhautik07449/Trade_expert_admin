import React, { useEffect, useState } from "react";
import CommonButton from "../../../components/widgets/common_button";
import { CommonTextField } from "../../../components/widgets/common_textField";
import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";
import CommonBox from "../../../components/common/common_box";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import Supplierservice from "../../../service/suppliers.service";
import { toast } from "../../../components/ui/use-toast";
import CountrySelection from "../../../components/widgets/country_selection";

const AddEditSuppliers = () => {
    const [data, setData] = useState([])

    const roles = [
        { label: "Sole Single Commodity", value: "Sole Single Commodity" },
        { label: "Sole Multiple Commodity", value: "Sole Multiple Commodity" },
        { label: "Consolidator Single Commodity", value: "Consolidator Single Commodity" },
        { label: "Consolidator Multiple Commodity", value: "Consolidator Multiple Commodity" },
        { label: "Composite Single Commodity", value: "Composite Single Commodity" },
        { label: "Composite Multiple Commodity", value: "Composite Multiple Commodity" },
    ];

    const { id } = useParams()
    const navigate = useNavigate()

    const initialValues = {
        firstName: data ? data?.firstName : "",
        lastName: data ? data?.lastName : "",
        company_name: data ? data?.company_name : "",
        email: data ? data?.email : "",
        website: data ? data?.website : "",
        phone: data ? data?.phone : "",
        city: data ? data?.city : "",
        state: data ? data?.state : "",
        address: data ? data?.address : "",
        service_type: data ? data?.service_type : "",
        country: data ? data?.country : "",
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        company_name: Yup.string().required("Company Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        website: Yup.string().required("Website is required"),
        phone: Yup.string().matches(/^[0-9]+$/, "Phone number must be digits"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        address: Yup.string().required("Address is required"),
        password: id ?
            Yup.string() :
            Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        country: Yup.string().required("Country is required"),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting }) => {
            setSubmitting(true);

            try {
                let response

                if (id) {
                    response = await Supplierservice.updateSuppliers(values, id)
                } else {
                    response = await Supplierservice.addSuppliers(values)
                }

                if (response) {
                    navigate("/user-management/scm/suppliers")
                    toast({
                        variant: "success",
                        title: "Suppliers",
                        description: response?.data?.message,
                    });
                }
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Suppliers Failed",
                    description: error?.response?.data?.message || "Suppliers Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });


    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await Supplierservice.getById(id);
                if (res) {
                    const data = res?.data
                    setData(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Supplier",
                    description: error?.response?.data?.message || "Something went wrong",
                });
            }
        }

        if (id) {
            getData(id)
        }
    }, [id])

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Supplier</h3>
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
                            label="Company Name"
                            placeholder="Enter Company Name"
                            name="company_name"
                            value={formik.values.company_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.company_name && formik.errors.company_name}
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

                        {!id && (
                            <CommonTextField
                                label="Password"
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && formik.errors.password}
                            />
                        )}

                        <CommonBox
                            label="Services Type"
                            placeholders="Select Services Type"
                            options={roles}
                            value={formik.values.service_type}
                            onChange={(value) => formik.setFieldValue("service_type", value)}
                            error={formik.touched.service_type && formik.errors.service_type}
                        />

                        <CountrySelection formik={formik} />
                    </div>

                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton type="button" variant="outline">
                            Cancel
                        </CommonButton>

                        <CommonButton type="submit" isLoading={formik.isSubmitting}>
                            {id ? "Edit" : "Add"} Supplier
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddEditSuppliers;