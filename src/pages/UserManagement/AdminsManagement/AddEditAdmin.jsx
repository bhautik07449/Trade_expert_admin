import React, { useEffect, useState } from "react"
import CommonButton from "../../../components/widgets/common_button"
import { useFormik } from "formik";
import * as Yup from "yup";
import Adminservice from "../../../service/admin.service"
import { CommonTextField } from "../../../components/widgets/common_textField"
import BackPath from "../../../components/common/BackPath"
import { Card } from "../../../components/ui/card"
import { useNavigate, useParams } from "react-router";
import ImageUploadField from "../../../components/common/ImageUploadField";
import { toast } from "../../../components/ui/use-toast";
import CountrySelection from "../../../components/widgets/country_selection";

const AddEditAdmin = () => {
    const params = useParams();
    const id = params["*"]
    const [list, setList] = useState()
    const navigate = useNavigate()

    const isEdit = Boolean(id)

    const initialValues = {
        firstName: list ? list?.firstName : "",
        lastName: list ? list?.lastName : "",
        email: list ? list?.email : "",
        phone: list ? list?.phone : "",
        country: list ? list?.country : "",
        password: "",
        photo: list ? list?.photo : "",
        status: list ? list?.status : "active"
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string()
            .matches(/^[0-9]+$/, "Phone number must be digits")
            .min(10, "Phone number must be at least 10 digits")
            .required("Phone number is required"),
        country: Yup.string().required('Country is required'),
        password: isEdit ?
            Yup.string() :
            Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        photo: Yup.mixed().required("Image is required")
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {

                if (isEdit) {
                    await Adminservice.updateAdmin(id, values)
                } else {
                    await Adminservice.addAdmin(values);
                }
                resetForm()
                navigate("/user-management/internal-users/admins-management")
                toast({
                    variant: "success",
                    title: "Admin",
                    description: "Admin",
                });
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Admin Failed",
                    description: error?.response?.data?.message || "Admin Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getAdmin = async (id) => {
            try {
                const res = await Adminservice.getAdminByid(id);
                if (res) {
                    const data = res?.data
                    setList(data);
                }

            } catch (error) {
                console.log(error, "error");
                toast({
                    variant: "error",
                    title: "Error",
                    description: error?.response?.data?.message || "Something went wrong",
                });
            }
        }

        if (isEdit) {
            getAdmin(id)
        }
    }, [id, isEdit])

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">{isEdit ? "Edit" : "Add"} Admin</h3>
            </div>
            <Card className="p-6">

                <form
                    onSubmit={formik.handleSubmit}
                    className="grid gap-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                            label="Email"
                            placeholder="Enter Email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && formik.errors.email}
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

                        <CountrySelection formik={formik} />

                        {!isEdit && (
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
                    </div>
                    <div>
                        <ImageUploadField
                            value={formik.values.photo}
                            onImageUpload={(url) => {
                                formik.setFieldValue("photo", url);
                            }} />
                        {formik.touched.photo && formik.errors.photo && (
                            <div className="text-red-500 text-sm">{formik.errors.photo}</div>
                        )}
                    </div>
                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton
                            type="button"
                            variant="outline"
                            onClick={() => formik.resetForm()}
                        >
                            Cancel
                        </CommonButton>

                        <CommonButton
                            type="submit"
                            isLoading={formik.isSubmitting}
                            disabled={!formik.isValid}
                        >
                            {isEdit ? "Update Admin" : "Add Admin"}
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default AddEditAdmin