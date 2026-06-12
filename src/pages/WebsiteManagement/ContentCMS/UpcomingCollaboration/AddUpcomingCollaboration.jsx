import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import CountrySelection from "../../../../components/widgets/country_selection";
import UpcomingCollaborationService from "../../../../service/upcomingcollaboration.service";
import ImageUploadField from "../../../../components/common/ImageUploadField";

export default function AddUpcomingCollaboration() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [list, setList] = useState()

    const initialValues = {
        image: list ? list?.image : "",
        url: list ? list?.url : "",
        country: list ? list?.country : "",
    };

    const validationSchema = Yup.object().shape({
        image: Yup.string().required("Image is required"),
        url: Yup.string().required("URL is required"),
        country: Yup.string().required("Country is required")
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
                    res = await UpcomingCollaborationService.updateUpcomingCollaboration(id, values)
                } else {
                    res = await UpcomingCollaborationService.addUpcomingCollaboration(values);
                }
                resetForm()
                navigate("/website-management/section-management/upcoming_collaboration")
                toast({
                    variant: "success",
                    title: "Upcoming Collaboration",
                    description: res?.data?.message,
                });
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Upcoming Collaboration Failed",
                    description: error?.response?.data?.message || "Upcoming Collaboration Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await UpcomingCollaborationService.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setList(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Upcoming Collaboration Details Error",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Upcoming Collaboration</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="URL"
                                placeholder="URL"
                                name="url"
                                value={formik.values.url}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.url && formik.errors.url}
                            />

                            <ImageUploadField
                                value={formik.values.image}
                                onImageUpload={(url) => {
                                    formik.setFieldValue("image", url);
                                }}
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