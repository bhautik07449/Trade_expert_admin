import CommonDialog from "../../../components/widgets/common_dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import React from "react"
import CommonButton from "../../../components/widgets/common_button"
import CommonImgupload from "../../../components/widgets/common_imgupload"
import { useFormik } from "formik";
import * as Yup from "yup";
import Userservice from "../../../service/usermanagement.service"

const AddEditAdmin = ({ isOpen, setIsOpen }) => {

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/250px-Image_created_with_a_mobile_phone.png",
        status: "active"
    };

    const validationSchema = Yup.object().shape({
        firstName: Yup.string().required("First Name is required"),
        lastName: Yup.string().required("Last Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string()
            .matches(/^[0-9]+$/, "Phone number must be digits")
            .min(10, "Phone number must be at least 10 digits")
            .required("Phone number is required"),
        password: Yup.string()
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
                await Userservice.addAdmin(values);
                setIsOpen(false);
                resetForm()
            } catch (error) {
                console.log("error", error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return (
        <CommonDialog
            isOpen={isOpen}
            onClose={() => setIsOpen("")}
            size="xl"
            title="Add Admin"
            footer={
                <div className="flex gap-2">
                    <CommonButton variant="outline" onClick={() => setIsOpen("")}>
                        cancel
                    </CommonButton>
                    <CommonButton
                        onClick={formik.handleSubmit}
                        disabled={formik.isSubmitting}
                    >
                        ADD
                    </CommonButton>
                </div>
            }
        >
            <div className="grid gap-4">

                <form onSubmit={formik.handleSubmit} className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-6 grid gap-4">
                        <div>
                            <Label>First Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter First Name"
                                name="firstName"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.firstName && formik.errors.firstName && (
                                <p className="text-red-500 text-sm">{formik.errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                placeholder="Enter Last Name"
                                name="lastName"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.lastName && formik.errors.lastName && (
                                <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
                            )}
                        </div>
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="text"
                                placeholder="Enter Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-red-500 text-sm">{formik.errors.email}</p>
                            )}
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 grid gap-4">
                        <div>
                            <Label>Phone No</Label>
                            <Input
                                type="text"
                                placeholder="Enter Phone No"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.phone && formik.errors.phone && (
                                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
                            )}
                        </div>
                        <div>
                            <Label>Password</Label>
                            <Input
                                type="text"
                                placeholder="Enter Password"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-red-500 text-sm">{formik.errors.password}</p>
                            )}
                        </div>
                        <div>
                            <Label>Image</Label>
                            <CommonImgupload
                                value={formik.values.photo}
                                onChange={(file) => formik.setFieldValue("photo", file)}
                                onBlur={() => formik.setFieldTouched("photo", true)}
                            />
                            {formik.touched.photo && formik.errors.photo && (
                                <p className="text-red-500 text-sm">{formik.errors.photo}</p>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </CommonDialog>
    )
}

export default AddEditAdmin