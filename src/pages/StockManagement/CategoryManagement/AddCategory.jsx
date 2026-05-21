import { Card } from "../../../components/ui/card";
import BackPath from "../../../components/common/BackPath";
import CommonBox from "../../../components/common/common_box";
import { CommonTextField } from "../../../components/widgets/common_textField";
import CommonButton from "../../../components/widgets/common_button";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Categoriesservice from "../../../service/categories.service";
import { useNavigate, useParams } from "react-router";
import { fetchFlatCategories } from "../../../store/slice/categoriesSlice";
import { toast } from "../../../components/ui/use-toast";
import CountrySelection from "../../../components/widgets/country_selection";

export default function AddCategory() {
    const { id } = useParams()
    const [data, setData] = useState()

    const navigate = useNavigate()

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFlatCategories());
    }, []);

    const initialValues = {
        name: data ? data?.name : "",
        slug: data ? data?.slug : "",
        pageTitle: data ? data?.pageTitle : "",
        metaKeyword: data ? data?.metaKeyword : "",
        metaDescription: data ? data?.metaDescription : "",
        parent: data ? data?.parent?.id : "",
        country: data ? data?.country : "",
        status: data ? data?.status : "active"
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        slug: Yup.string().required("Slug is required"),
        pageTitle: Yup.string().required("Page Title is required"),
        metaKeyword: Yup.string().required("Meta Keyword is required"),
        metaDescription: Yup.string().required("Meta Description is required"),
        country: Yup.string().required("Country is required"),
        status: Yup.string().required("Status is required")
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
                    name: values.name,
                    slug: values.slug,
                    pageTitle: values.pageTitle,
                    metaKeyword: values.metaKeyword,
                    metaDescription: values.metaDescription,
                    country: values.country,
                    status: values.status,
                };

                if (values.parent) {
                    payload.parent = { id: values.parent };
                }

                let res

                if (id) {
                    res = await Categoriesservice.update(payload, id)
                } else {
                    res = await Categoriesservice.create(payload);
                }

                if (res) {
                    resetForm()
                    navigate("/stock-management/category-management")
                    toast({
                        variant: "success",
                        title: "Category",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Category Failed",
                    description: error?.response?.data?.message || "Category Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    const { flatList, loading } = useSelector(
        (state) => state.categories
    );

    const parentOptions = useMemo(() => {
        return flatList
            .filter((item) => {
                const isNotSelf = !id || item.id !== Number(id);
                const matchesCountry = !formik.values.country || item.country === formik.values.country;
                return isNotSelf && matchesCountry;
            })
            .map((item) => ({
                label: item.name,
                value: item.id
            }));
    }, [flatList, formik.values.country, id]);

    const getData = async (id) => {
        try {
            const res = await Categoriesservice.getById(id)

            if (res) {
                setData(res?.data)
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (id) {
            getData(id)
        }
    }, [id])

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Category</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            label="Slug"
                            placeholder="Slug"
                            name="slug"
                            value={formik.values.slug}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.slug && formik.errors.slug}
                        />

                        <CommonTextField
                            label="Page Title"
                            placeholder="Page Title"
                            name="pageTitle"
                            value={formik.values.pageTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pageTitle && formik.errors.pageTitle}
                        />

                        <CommonTextField
                            label="Meta Key Word"
                            placeholder="Meta Key Word"
                            name="metaKeyword"
                            value={formik.values.metaKeyword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.metaKeyword && formik.errors.metaKeyword}
                        />

                        <CommonTextField
                            label="Meta Description"
                            placeholder="Meta Description"
                            name="metaDescription"
                            value={formik.values.metaDescription}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.metaDescription && formik.errors.metaDescription}
                        />

                        <CommonBox
                            label="Parent Category"
                            placeholders="Select Category"
                            options={parentOptions}
                            value={formik.values.parent}
                            onChange={(value) => formik.setFieldValue("parent", value)}
                            error={formik.touched.parent && formik.errors.parent}
                        />

                        <CountrySelection formik={formik} />

                        <CommonBox
                            label="Status"
                            placeholders="Select Category Status"
                            options={[
                                { label: "Active", value: "active" },
                                { label: "Blocked", value: "blocked" }
                            ]}
                            value={formik.values.status}
                            onChange={(value) => formik.setFieldValue("status", value)}
                            error={formik.touched.status && formik.errors.status}
                        />

                    </div>

                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton type="button" variant="outline">
                            Cancel
                        </CommonButton>

                        <CommonButton type="submit" isLoading={formik.isSubmitting}>
                            {id ? "Edit" : "Add"}
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    )
}