import CommonDialog from "../../../components/widgets/common_dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import React from "react"
import CommonButton from "../../../components/widgets/common_button"
import CommonImgupload from "../../../components/widgets/common_imgupload"
import { useFormik } from "formik";
import * as Yup from "yup";
import Userservice from "../../../service/usermanagement.service"
import { CommonTextField } from "../../../components/widgets/common_textField"
import BackPath from "../../../components/common/BackPath"
import { Card } from "../../../components/ui/card"

const AddEditAdmin = () => {

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
                resetForm()
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
                <h3 className="h5-bold">Add Admin</h3>
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

                        <CommonTextField
                            label="Image URL"
                            placeholder="Paste Image URL"
                            name="photo"
                            value={formik.values.photo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.photo && formik.errors.photo}
                        />
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
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {formik.isSubmitting ? "Saving..." : "Add Admin"}
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    );
}

export default AddEditAdmin