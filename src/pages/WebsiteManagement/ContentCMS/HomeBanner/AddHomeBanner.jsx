import CommonButton from "../../../../components/widgets/common_button";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import { useNavigate, useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Homebannerservice from "../../../../service/homebanner.service";
import { toast } from "../../../../components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../store/slice/categoriesSlice";
import CommonBox from "../../../../components/common/common_box";
import CountrySelection from "../../../../components/widgets/country_selection";

export default function AddHomeBanner() {
    const { id } = useParams()
    const [data, setData] = useState()

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const { categories } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const initialValues = {
        image: data ? data?.image : "",
        country: data ? data?.country : "",
        category: data ? data?.category?.id : ""
    };

    const validationSchema = Yup.object().shape({
        image: Yup.string().required("Name is required"),
        country: Yup.string().required("Country is required"),
        category: Yup.string().required("Category is required"),
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log("values", values);

            setSubmitting(true);
            try {

                let res
                if (id) {
                    res = await Homebannerservice.updateHomeBanner(id, values)
                } else {
                    res = await Homebannerservice.addHomeBanner(values)
                }

                if (res) {
                    resetForm()
                    navigate("/website-management/content/home-banner")
                    toast({
                        variant: "success",
                        title: "Home Banner",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Home Banner Failed",
                    description: error?.response?.data?.message || "Home Banner Failed resubmit",
                });
            } finally {
                setSubmitting(false);
                resetForm()
            }
        }
    });

    const categoryOptions = useMemo(() => {
        return categories?.map((cat) => ({
            label: cat.name,
            value: cat.id
        }));
    }, [categories]);

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await Homebannerservice.getByid(id);
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Home Banner</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <ImageUploadField
                                value={formik.values.image}
                                onImageUpload={(url) => {
                                    formik.setFieldValue("image", url);
                                }}
                            />

                            <CommonBox
                                label="Category"
                                placeholders="Select Category"
                                options={categoryOptions}
                                name="category"
                                value={formik.values.category}
                                onChange={(value) => {
                                    formik.setFieldValue("category", value);
                                }}
                                error={formik.touched.category && formik.errors.category}
                            />

                            <CountrySelection formik={formik} />
                        </div>
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