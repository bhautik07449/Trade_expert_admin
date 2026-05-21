import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import TradeHistoryservice from "../../../../service/tradeHistory.service";
import CountrySelection from "../../../../components/widgets/country_selection";

export default function AddTradeHistory() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()

    const initialValues = {
        content: data ? data?.content : "",
        image: data ? data?.image : "",
        country: data ? data?.country : "",
        year: data ? data?.year : "",
        label: data ? data?.label : "",
    };

    const validationSchema = Yup.object().shape({
        content: Yup.string().required("Content is required"),
        image: Yup.string().required("Image is required"),
        year: Yup.string().required("Year is required"),
        label: Yup.string().required("Label is required"),
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
                    res = await TradeHistoryservice.updateTradeHistory(id, values)
                } else {
                    res = await TradeHistoryservice.addTradeHistory(values);
                }
                resetForm()
                navigate("/website-management/country/trade-history")
                toast({
                    variant: "success",
                    title: "Trade History",
                    description: res?.data?.message,
                });
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Trade History Failed",
                    description: error?.response?.data?.message || error?.message || "Events Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await TradeHistoryservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setData(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Trade History Failed",
                    description: error?.response?.data?.message || error?.message || "Events Failed resubmit",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Trade History</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="Content"
                                placeholder="Content"
                                name="content"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.content && formik.errors.content}
                            />

                            <CommonTextField
                                label="Year"
                                placeholder="Year"
                                name="year"
                                value={formik.values.year}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.year && formik.errors.year}
                            />

                            <CommonTextField
                                label="Label"
                                placeholder="Label"
                                name="label"
                                value={formik.values.label}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.label && formik.errors.label}
                            />

                            <div className="space-y-5">
                                <ImageUploadField
                                    value={formik.values.image}
                                    onImageUpload={(url) => {
                                        formik.setFieldValue("image", url);
                                    }} />
                            </div>

                            <CountrySelection formik={formik} />
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