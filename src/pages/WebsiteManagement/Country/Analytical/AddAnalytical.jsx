import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import CountrySelection from "../../../../components/widgets/country_selection";
import Analyticalservice from "../../../../service/analytical.service";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function AddAnalytical() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()

    const initialValues = {
        title: data ? data?.title : "",
        value: data ? data?.value : "",
        country: data ? data?.country : ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        value: Yup.string().required("Value is required"),
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
                    res = await Analyticalservice.updateAnalytical(id, values)
                } else {
                    res = await Analyticalservice.addAnalytical(values);
                }
                resetForm()
                navigate("/website-management/country/analytical")
                toast({
                    variant: "success",
                    title: "Analytical",
                    description: res?.data?.message,
                });
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Analytical Failed",
                    description: error?.response?.data?.message || error?.message || "Analytical Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await Analyticalservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setData(data)
                }

            } catch (error) {
                console.log(error, "error");
                toast({
                    variant: "error",
                    title: "Fetch Failed",
                    description: error?.response?.data?.message || error?.message || "Failed to fetch analytical data",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Analytical</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-8">
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
                                label="Value"
                                placeholder="Value"
                                name="value"
                                value={formik.values.value}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.value && formik.errors.value}
                            />

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