import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import CommonBox from "../../../../components/common/common_box";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import CommonButton from "../../../../components/widgets/common_button";
import { useEffect, useMemo, useState } from "react";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchFlatCategories } from "../../../../store/slice/categoriesSlice";
import QualityPolicyservice from "../../../../service/qualityPolicy.service";
import { toast } from "../../../../components/ui/use-toast";

export default function AddQualityPolicies() {
    const [list, setList] = useState()
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchFlatCategories());
    }, []);

    const getList = async (id) => {
        try {
            const res = await QualityPolicyservice.getByid(id)
            if (res) {
                setList(res?.data?.data)
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (id) {
            getList(id)
        }
    }, [])

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
        name: list?.name ? list?.name : "",
        description: list?.description ? list?.description : "",
        logo: list?.logo ? list?.logo : "",
        category: list?.category ? list?.category?.id : "",
        status: list?.status ? list?.status : "active"
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
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log("values", values);

            setSubmitting(true);
            try {

                const payload = {
                    name: values?.name,
                    description: values?.description,
                    logo: values?.logo,
                    status: values?.status
                };

                if (values.category) {
                    payload.category = { id: values.category };
                }

                let res
                if (id) {
                    res = await QualityPolicyservice.updateQualityPolicy(id, payload)
                } else {
                    res = await QualityPolicyservice.addQualityPolicy(payload)
                }

                if (res) {
                    resetForm()
                    navigate("/website-management/content/quality-policies")
                    toast({
                        variant: "success",
                        title: "Quality Policies",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Quality Policies Failed",
                    description: error?.response?.data?.message || "Quality Policies Failed resubmit",
                });
            } finally {
                setSubmitting(false);
                resetForm()
            }
        }
    });

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Quality Policy</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonBox
                                label="Category"
                                placeholders="Select Category"
                                name="category"
                                options={parentOptions}
                                value={formik.values.category}
                                onChange={(value) => formik.setFieldValue("category", value)}
                                error={formik.touched.category && formik.errors.category}
                            />
                            <CommonTextField
                                label="Name"
                                placeholder="Enter name"
                                name="name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.name && formik.errors.name}
                            />
                            <div className="space-y-5">
                                <ImageUploadField
                                    value={formik.values.logo}
                                    onImageUpload={(url) => {
                                        formik.setFieldValue("logo", url);
                                    }} />
                            </div>
                            <CommonTextField
                                label="Description"
                                placeholder="Enter Description"
                                name="description"
                                type="textarea"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
                            />
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