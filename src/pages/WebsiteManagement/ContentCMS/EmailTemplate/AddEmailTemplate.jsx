import { Card } from "../../../../components/ui/card";
import { toast } from "../../../../components/ui/use-toast";
import Emailtemplateservice from "../../../../service/emailtemplate.service";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as Yup from "yup";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import CommonButton from "../../../../components/widgets/common_button";
import BackPath from "../../../../components/common/BackPath";
import Editor from "../../../../common/Editor";

export default function AddEmailTemplate() {
    const { id } = useParams()
    const [list, setList] = useState()
    const navigate = useNavigate()

    const initialValues = {
        template_name: list ? list?.template_name : "",
        email_subject: list ? list?.email_subject : "",
        email_body: list ? list?.email_body : ""
    };

    const validationSchema = Yup.object().shape({
        template_name: Yup.string().required("Template Name is required"),
        email_subject: Yup.string().required("Email Subject is required"),
        email_body: Yup.string().required("Email Body is required")
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
                    res = await Emailtemplateservice.updateEmailtemplate(id, values)
                } else {
                    res = await Emailtemplateservice.addEmailtemplate(values);
                }
                resetForm()
                navigate("/website-management/content/email-template")
                toast({
                    variant: "success",
                    title: "Email Template",
                    description: res?.data?.message || "Email Template added successfully",
                });
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Email Template Failed",
                    description: "Email Template Failed resubmit",
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
                const res = await Emailtemplateservice.getByid(id);
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Email Template</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="Template Name"
                                placeholder="Template Name"
                                name="template_name"
                                value={formik.values.template_name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.template_name && formik.errors.template_name}
                            />
                            <CommonTextField
                                label="Email Subject"
                                placeholder="Email Subject"
                                name="email_subject"
                                value={formik.values.email_subject}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email_subject && formik.errors.email_subject}
                            />
                            <Editor
                                label="Email Body"
                                value={formik.values.email_body}
                                onChange={(value) => formik.setFieldValue("email_body", value)}
                            />

                            {formik.touched.email_body && formik.errors.email_body && (
                                <p className="text-red-500 text-sm">{formik.errors.email_body}</p>
                            )}
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
                            {formik.isSubmitting ? "Saving..." : id ? "Update Email Template" : "Add Email Template"}
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    );
};