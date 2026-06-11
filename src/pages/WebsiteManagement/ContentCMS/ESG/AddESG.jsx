import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import ESGService from "../../../../service/esg.service";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import CommonBox from "../../../../components/common/common_box";
import CountrySelection from "../../../../components/widgets/country_selection";
import { fetchCategories } from "../../../../store/slice/categoriesSlice";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function AddESG() {
    const { id } = useParams()
    const [data, setData] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    const { categories } = useSelector(
        (state) => state.categories
    );

    const initialValues = {
        name: data ? data?.name : "",
        image: data ? data?.image : "",
        description: data ? data?.description : "",
        category: data ? data?.category?.id : "",
        country: data ? data?.country : "",
        tag: data ? data?.tag : ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        image: Yup.string().required("Image is required"),
        description: Yup.string().required("Description is required"),
        category: Yup.string().required("Category is required"),
        country: Yup.string().required("Country is required"),
        tag: Yup.string().required("Tag is required")
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
                    res = await ESGService.updateESG(id, values)
                } else {
                    res = await ESGService.addESG(values);
                }
                resetForm()
                navigate("/website-management/content/esg")
                toast({
                    variant: "success",
                    title: "ESG Saved",
                    description: res?.data?.message,
                });
            } catch (error) {
                toast({
                    variant: "error",
                    title: "ESG Failed",
                    description: error?.response?.data?.message || "ESG Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    const categoryOptions = useMemo(() => {
        return categories
            ?.filter(cat => !formik.values.country || cat.country === formik.values.country)
            .map(cat => ({
                label: cat.name,
                value: cat.id,
            }));
    }, [categories, formik.values.country]);

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await ESGService.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setData(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Get ESG Error",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Environment Social Governance</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
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
                                rows={4}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
                            />

                            <ImageUploadField
                                value={formik.values.image}
                                onImageUpload={(url) => {
                                    formik.setFieldValue("image", url);
                                }}
                            />


                            <CountrySelection formik={formik} />
                            <CommonBox
                                label="Category"
                                placeholders="Select Category"
                                options={categoryOptions}
                                name="category"
                                value={formik.values.category}
                                onChange={(value) => {
                                    formik.setFieldValue("category", value);
                                }}
                                disabled={!formik?.values?.country}
                                error={formik.touched.category && formik.errors.category}
                            />

                            <CommonBox
                                label="Tag"
                                placeholders="Select Tag"
                                options={[
                                    { label: "Environment", value: "Environment" },
                                    { label: "Social", value: "Social" },
                                    { label: "Governance", value: "Governance" }
                                ]}
                                name="tag"
                                value={formik.values.tag}
                                onChange={(value) => {
                                    formik.setFieldValue("tag", value);
                                }}
                                error={formik.touched.tag && formik.errors.tag}
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
                            isLoading={formik.isSubmitting}
                            disabled={!formik.isValid}
                        >
                            {id ? "Update" : "Add"}
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    )
}