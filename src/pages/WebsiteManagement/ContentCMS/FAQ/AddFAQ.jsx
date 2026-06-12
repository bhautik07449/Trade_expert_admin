import CommonButton from "../../../../components/widgets/common_button";
import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import Editor from "../../../../common/Editor";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Faqservice from "../../../../service/faq.service";
import { toast } from "../../../../components/ui/use-toast";
import CountrySelection from "../../../../components/widgets/country_selection";

export default function AddFAQ() {
    const { id } = useParams()
    const [data, setData] = useState()

    const navigate = useNavigate()

    const initialValues = {
        title: data ? data?.title : "",
        country: data ? data?.country : "",
        answer: data ? data?.answer : ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        country: Yup.string().required("Country is required"),
        answer: Yup.string().required("Answer is required")
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
                    res = await Faqservice.updateFaq(id, values)
                } else {
                    res = await Faqservice.addFaq(values)
                }

                if (res) {
                    resetForm()
                    navigate("/website-management/pages-management/faq")
                    toast({
                        variant: "success",
                        title: "FAQs",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                toast({
                    variant: "error",
                    title: "FAQs Failed",
                    description: error?.response?.data?.message || "FAQs Failed resubmit",
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
                const res = await Faqservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setData(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "FAQs Data Fetch Failed",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Faq</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CountrySelection formik={formik} />
                            <CommonTextField
                                label="Title"
                                placeholder="Title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && formik.errors.title}
                            />
                            <Editor
                                label="Answer"
                                value={formik.values.answer}
                                onChange={(value) => formik.setFieldValue("answer", value)}
                            />

                            {formik.touched.answer && formik.errors.answer && (
                                <p className="text-red-500 text-sm">{formik.errors.answer}</p>
                            )}
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