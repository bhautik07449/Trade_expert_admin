import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import CountrySelection from "../../../../components/widgets/country_selection";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import Policypreambleservice from "../../../../service/policypreamble.service";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../store/slice/categoriesSlice";
import CommonBox from "../../../../components/common/common_box";

export default function AddPolicyPreamble() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [list, setList] = useState()

    const dispatch = useDispatch();

    const { categories } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const initialValues = {
        title: list ? list?.title : "",
        country: list ? list?.country : "",
        image: list ? list?.image : "",
        description: list ? list?.description : "",
        category: list ? list?.category?.id : ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        image: Yup.string().required("Image is required"),
        country: Yup.string().required("Country is required"),
        category: Yup.string().required("Category is required")
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
                    res = await Policypreambleservice.updatePolicypreamble(id, values)
                } else {
                    res = await Policypreambleservice.addPolicypreamble(values);
                }
                resetForm()
                navigate("/website-management/content/policy_preamble")
                toast({
                    variant: "success",
                    title: "Policy Preamble",
                    description: res?.data?.message,
                });
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Policy Preamble Failed",
                    description: error?.response?.data?.message || "Policy Preamble Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    const categoryOptions = useMemo(() => {
        const selectedCountry = formik.values.country;
        const filtered = categories?.filter((cat) => {

            return !selectedCountry || cat.country === selectedCountry;
        }) || [];
        return filtered.map((cat) => ({
            label: cat.name,
            value: cat.id
        }));
    }, [categories, formik.values.country]);

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await Policypreambleservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setList(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Policy Preamble Details Error",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Policy Preamble</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="Title"
                                placeholder="Title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && formik.errors.title}
                            />

                            <CommonTextField
                                label="Description"
                                placeholder="Description"
                                name="description"
                                type="textarea"
                                rows={10}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
                            />

                            <CountrySelection formik={formik} />

                            <CommonBox
                                label="Category"
                                placeholders="Select Category"
                                options={categoryOptions}
                                name="category"
                                value={formik.values.category}
                                onChange={(value) => { formik.setFieldValue("category", value); }}
                                error={formik.touched.category && formik.errors.category}
                            />

                            <ImageUploadField
                                value={formik.values.image}
                                onImageUpload={(url) => {
                                    formik.setFieldValue("image", url);
                                }}
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