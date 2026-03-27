import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import CommonButton from "../../../../components/widgets/common_button";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { useNavigate, useParams } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Cuurrencyservice from "../../../../service/currency.service";
import { useEffect, useState } from "react";
import { toast } from "../../../../components/ui/use-toast";

export default function AddCurrency() {
    const { id } = useParams()
    const [list, setList] = useState()
    const navigate = useNavigate()

    const initialValues = {
        name: list ? list?.name : "",
        rate: list ? list?.rate : "",
        symbol: list ? list?.symbol : "",
        image: list ? list?.image : "",
        description: list ? list?.description : ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        rate: Yup.number().required("Rate is required"),
        symbol: Yup.string().required("Symbol is required"),
        image: Yup.mixed().required("Image is required"),
        description: Yup.mixed().required("Description is required")
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
                    res = await Cuurrencyservice.updateCurrency(id, values)
                } else {
                    res = await Cuurrencyservice.addCurrency(values);
                }
                resetForm()
                navigate("/website-management/content/currency")
                toast({
                    variant: "success",
                    title: "Currency",
                    description: res?.data?.message || "Currency",
                });
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Currency Failed",
                    description: "Currency Failed resubmit",
                });
            } finally {
                setSubmitting(false);
                resetForm()
            }
        }
    });

    useEffect(() => {
        const getAdmin = async (id) => {
            try {
                const res = await Cuurrencyservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setList(data);
                }

            } catch (error) {
                console.log(error, "error");
            }
        }

        if (id) {
            getAdmin(id)
        }
    }, [id])

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Currency</h3>
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
                                label="Rate"
                                placeholder="Rate"
                                name="rate"
                                type="number"
                                value={formik.values.rate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.rate && formik.errors.rate}
                            />
                            <CommonTextField
                                label="Symbol"
                                placeholder="Symbol"
                                name="symbol"
                                value={formik.values.symbol}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.symbol && formik.errors.symbol}
                            />
                        </div>
                        <div className="space-y-5">
                            <CommonTextField
                                label="Description"
                                placeholder="Description"
                                type="textarea"
                                rows={6}
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
                            />
                            <ImageUploadField
                                value={formik.values.image}
                                onImageUpload={(url) => {
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
                            {formik.isSubmitting ? "Saving..." : id ? "Update Admin" : "Add Admin"}
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    );
};