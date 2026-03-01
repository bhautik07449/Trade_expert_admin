import CommonBox from "../../../../components/common/common_box";
import BackPath from "../../../../components/common/BackPath";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlatCategories } from "../../../../store/slice/categoriesSlice";
import Brandservice from "../../../../service/brands.service";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";

export default function AddBrandManagement() {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchFlatCategories());
    }, []);


    const { flatList, loading } = useSelector(
        (state) => state.categories
    );

    const parentOptions = useMemo(() => {
        return flatList.map((item) => ({
            label: item.name,
            value: item.id
        }));
    }, [flatList]);

    const initialValues = {
        name: "",
        description: "",
        logo: "",
        category: "",
        status: "active"
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        logo: Yup.string().required("logo is required"),
        category: Yup.string().required("Category is required"),
        status: Yup.string().required("Status is required")
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        // validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log("values", values);

            setSubmitting(true);
            try {

                const payload = {
                    name: values?.name,
                    description: values?.description,
                    logo: values?.logo,
                    status: "active"
                };

                if (values.category) {
                    payload.category = { id: values.category };
                }

                const res = await Brandservice.create(payload)
                if (res) {
                    resetForm()
                    navigate("/website-management/content/brands")
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
                <h3 className="h5-bold">Add Brand</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonBox
                                placeholders="Select Category"
                                label="Category"
                                name="category"
                                options={parentOptions}
                                value={formik.values.category}
                                onChange={(value) => formik.setFieldValue("category", value)}
                                error={formik.touched.category && formik.errors.category}
                            />
                            <CommonTextField
                                label="Name"
                                placeholder="Name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && formik.errors.name}
                            />
                            <CommonTextField
                                label="Description"
                                placeholder="Description"
                                name="description"
                                type="textarea"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
                            />
                            <CommonBox
                                label="Status"
                                placeholders="Select Category Status"
                                name="status"
                                options={[
                                    { label: "Active", value: "active" },
                                    { label: "Blocked", value: "blocked" }
                                ]}
                                value={formik.values.status}
                                onChange={(value) => formik.setFieldValue("status", value)}
                                error={formik.touched.status && formik.errors.status}
                            />
                        </div>
                        <div className="space-y-5">
                            <ImageUploadField onImageUpload={(url) => {
                                formik.setFieldValue("logo", url);
                            }} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton type="button" variant="outline">
                            Cancel
                        </CommonButton>

                        <CommonButton type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Adding..." : "Add"}
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    )
}