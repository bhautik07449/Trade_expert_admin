import CommonBox from "../../../../components/common/common_box";
import BackPath from "../../../../components/common/BackPath";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlatBlogCategories } from "../../../../store/slice/blogcategorySlice";
import Blogservice from "../../../../service/blogs.service";
import { toast } from "../../../../components/ui/use-toast";

export default function AddBlogsManagement() {
    const { id } = useParams()
    const [data, setData] = useState()

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchFlatBlogCategories());
    }, []);


    const { flatList, loading } = useSelector(
        (state) => state.blogcategory
    );

    const parentOptions = useMemo(() => {
        return flatList?.map((item) => ({
            label: item?.name,
            value: item?.id
        }));
    }, [flatList]);

    const initialValues = {
        postDate: data ? data?.postDate?.split("T")[0] : "",
        name: data ? data?.name : "",
        blogTitle: data ? data?.blogTitle : "",
        blogDetail: data ? data?.blogDetail : "",
        slider: data ? data?.slider : "",
        blog_category: data ? data?.blog_category?.id : ""
    };

    const validationSchema = Yup.object().shape({
        postDate: Yup.string().required("Post Date is required"),
        name: Yup.string().required("Name is required"),
        blogTitle: Yup.string().required("Blog Title is required"),
        blogDetail: Yup.string().required("Blog Detail is required"),
        slider: Yup.string().required("slider is required"),
        blog_category: Yup.string().required("Select Blog Category")
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log("values", values);

            setSubmitting(true);
            try {

                const payload = {
                    postDate: values?.postDate,
                    name: values?.name,
                    blogTitle: values?.blogTitle,
                    blogDetail: values?.blogDetail,
                    slider: values?.slider,
                };

                if (values.blog_category) {
                    payload.blog_category = { id: values.blog_category };
                }

                let res
                if (id) {
                    res = await Blogservice.updateblog(id, payload)
                } else {
                    res = await Blogservice.addblog(payload)
                }

                if (res) {
                    resetForm()
                    navigate("/website-management/content/blogs")
                    toast({
                        variant: "success",
                        title: "Blogs",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Blogs Failed",
                    description: error?.response?.data?.message || "Blogs Failed resubmit",
                });
            } finally {
                setSubmitting(false);
                resetForm()
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await Blogservice.getById(id);
                if (res) {
                    const data = res?.data?.data
                    setData(data)
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Blog</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="Expected Post Date"
                                placeholder="Expected Post Date"
                                name="postDate"
                                type="date"
                                value={formik.values.postDate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.postDate && formik.errors.postDate}
                            />
                            <CommonBox
                                placeholders="Select Blog Category"
                                label="Blog Category"
                                name="blog_category"
                                options={parentOptions}
                                value={formik.values.blog_category}
                                onChange={(value) => formik.setFieldValue("blog_category", value)}
                                error={formik.touched.blog_category && formik.errors.blog_category}
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
                                label="Blog Title"
                                placeholder="Blog Title"
                                name="blogTitle"
                                value={formik.values.blogTitle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.blogTitle && formik.errors.blogTitle}
                            />
                            <CommonTextField
                                label="Blog Detail"
                                placeholder="Blog Detail"
                                type="textarea"
                                rows={6}
                                name="blogDetail"
                                value={formik.values.blogDetail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.blogDetail && formik.errors.blogDetail}
                            />
                        </div>
                        <div className="space-y-5">
                            <ImageUploadField
                                value={formik.values.slider}
                                onImageUpload={(url) => {
                                    formik.setFieldValue("slider", url);
                                }} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton type="button" variant="outline">
                            Cancel
                        </CommonButton>

                        <CommonButton type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Adding..." : id ? "Edit" : "Add"}
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    )
}