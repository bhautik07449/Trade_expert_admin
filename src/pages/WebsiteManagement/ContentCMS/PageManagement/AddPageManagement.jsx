import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import CommonButton from "../../../../components/widgets/common_button";
import CommonBox from "../../../../components/common/common_box";
import { useEffect, useState } from "react";
import Editor from "../../../../common/Editor";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Pageservice from "../../../../service/pages.service";
import { toast } from "../../../../components/ui/use-toast";

export default function AddPageManagement() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [list, setList] = useState()

    const initialValues = {
        page_name: list?.page_name || "",
        page_title: list?.page_title || "",
        page_url: list?.page_url || "",
        page_meta_title: list?.page_meta_title || "",
        meta_keyword: list?.meta_keyword || "",
        meta_description: list?.meta_description || "",
        content: list?.content || "",
        status: list?.status || ""
    };

    const validationSchema = Yup.object().shape({
        page_name: Yup.string().required("Page Name is required"),
        page_title: Yup.string().required("Page Title is required"),
        page_url: Yup.string()
            .required("Page URL is required"),
        page_meta_title: Yup.string().required("Meta Title is required"),
        meta_keyword: Yup.string().required("Meta Keyword is required"),
        meta_description: Yup.string().required("Meta Description is required"),
        content: Yup.string().required("Content is required"),
        status: Yup.string().required("Status is required")
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {

                let res
                if (id) {
                    res = await Pageservice.updatePage(id, values)
                } else {
                    res = await Pageservice.addPage(values);
                }
                resetForm()
                navigate("/website-management/content/pages")
                toast({
                    variant: "success",
                    title: "Pages",
                    description: res?.data?.message,
                });
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Pages Failed",
                    description: "Pages Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await Pageservice.getByid(id);
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
                <h3 className="h5-bold">Add Pages</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="Page Name"
                                placeholder="Page Name"
                                name="page_name"
                                value={formik.values.page_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.page_name && formik.errors.page_name}
                            />
                            <CommonTextField
                                label="Page Title"
                                placeholder="Page Title"
                                name="page_title"
                                value={formik.values.page_title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.page_title && formik.errors.page_title}
                            />
                            <CommonTextField
                                label="Page Url"
                                placeholder="Page Url"
                                name="page_url"
                                value={formik.values.page_url}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.page_url && formik.errors.page_url}
                            />
                            <CommonTextField
                                label="Page Meta Title"
                                placeholder="Page Meta Title"
                                name="page_meta_title"
                                value={formik.values.page_meta_title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.page_meta_title && formik.errors.page_meta_title}
                            />
                            <CommonTextField
                                label="Meta Keyword"
                                placeholder="Meta Keyword"
                                name="meta_keyword"
                                value={formik.values.meta_keyword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.meta_keyword && formik.errors.meta_keyword}
                            />
                            <CommonTextField
                                label="Meta Description"
                                placeholder="Meta Description"
                                name="meta_description"
                                value={formik.values.meta_description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.meta_description && formik.errors.meta_description}
                            />
                        </div>
                        <div className="space-y-5">
                            <Editor
                                label="Content"
                                value={formik.values.content}
                                onChange={(value) => formik.setFieldValue("content", value)}
                            />

                            {formik.touched.content && formik.errors.content && (
                                <p className="text-red-500 text-sm">{formik.errors.content}</p>
                            )}
                            <CommonBox
                                placeholders="Select Status of Page"
                                options={[
                                    { label: "active", value: "active" },
                                    { label: "inactive", value: "inactive" },
                                ]}
                                value={formik.values.status}
                                onChange={(value) => formik.setFieldValue("status", value)}
                                error={formik.touched.status && formik.errors.status}
                            />
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