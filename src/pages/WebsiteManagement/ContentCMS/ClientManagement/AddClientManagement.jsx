import CommonBox from "../../../../components/common/common_box";
import BackPath from "../../../../components/common/BackPath";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Clientservice from "../../../../service/client.service";

export default function AddClientManagement() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [list, setList] = useState()

    const initialValues = {
        first_name: list ? list?.first_name : "",
        last_name: list ? list?.last_name : "",
        email: list ? list?.email : "",
        phone: list ? list?.phone : "",
        image: list ? list?.image : ""
    };

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .trim()
            .required("first Name is required"),
        last_name: Yup.string()
            .trim()
            .required("last Namr is required"),
        email: Yup.string().email().required("Email is Required"),
        phone: Yup.string().required("Phone No. is Required"),
        image: Yup.string().required("Image is required")
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {

                if (id) {
                    await Clientservice.updateClient(id, values)
                } else {
                    await Clientservice.addClient(values);
                }
                resetForm()
                navigate("/website-management/content/client")
            } catch (error) {
                console.log("error", error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await Clientservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setList(data)
                }

            } catch (error) {
                console.log(error, "error");
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Client</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="First Name"
                                placeholder="First Name"
                                name="first_name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.first_name && formik.errors.first_name}
                            />
                            <CommonTextField
                                label="Last Name"
                                placeholder="Last Name"
                                name="last_name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.last_name && formik.errors.last_name}
                            />
                            <CommonTextField
                                label="Email"
                                placeholder="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email}
                            />
                        </div>
                        <div className="space-y-5">
                            <CommonTextField
                                label="Phone No."
                                placeholder="Phone No."
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && formik.errors.phone}
                            />
                            <ImageUploadField onImageUpload={(url) => {
                                formik.setFieldValue("image", url);
                            }} />
                        </div>
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
                            {formik.isSubmitting ? "Saving..." : id ? "Update" : "Add"}
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    )
}