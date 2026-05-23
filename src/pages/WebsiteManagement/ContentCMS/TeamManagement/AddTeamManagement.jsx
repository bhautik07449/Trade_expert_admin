import BackPath from "../../../../components/common/BackPath";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import Teamservice from "../../../../service/teams.service";
import { toast } from "../../../../components/ui/use-toast";

export default function AddTeamManagement() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [list, setList] = useState()

    const initialValues = {
        name: list ? list?.name : "",
        description: list ? list?.description : "",
        facebook: list ? list?.facebook : "",
        twitter: list ? list?.twitter : "",
        linkedin: list ? list?.linkedin : "",
        google: list ? list?.google : "",
        youtube: list ? list?.youtube : "",
        image: list ? list?.image : ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .trim()
            .required("Name is required")
            .min(2, "Name must be at least 2 characters"),
        description: Yup.string()
            .trim()
            .required("Description is required")
            .min(10, "Description must be at least 10 characters"),
        facebook: Yup.string()
            .nullable()
            .url("Enter a valid Facebook URL"),
        twitter: Yup.string()
            .nullable()
            .url("Enter a valid Twitter URL"),
        linkedin: Yup.string()
            .nullable()
            .url("Enter a valid LinkedIn URL"),
        google: Yup.string()
            .nullable()
            .url("Enter a valid Google URL"),
        youtube: Yup.string()
            .nullable()
            .url("Enter a valid YouTube URL"),
        image: Yup.string().required("Image is required")
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
                    res = await Teamservice.updateTeam(id, values)
                } else {
                    res = await Teamservice.addTeam(values);
                }
                resetForm()
                navigate("/website-management/content/team")
                toast({
                    variant: "success",
                    title: "Team",
                    description: res?.data?.message,
                });
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Team Failed",
                    description: error?.response?.data?.message || "Team Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await Teamservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setList(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Fetch Team Failed",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Team</h3>
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
                        <div className="space-y-5">
                            <CommonTextField
                                label="Facebook Link"
                                placeholder="Facebook Link"
                                name="facebook"
                                value={formik.values.facebook}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.facebook && formik.errors.facebook}
                            />
                            <CommonTextField
                                label="Twitter Link"
                                placeholder="Twitter Link"
                                name="twitter"
                                value={formik.values.twitter}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.twitter && formik.errors.twitter}
                            />
                            <CommonTextField
                                label="LinkedIn Link"
                                placeholder="LinkedIn Link"
                                name="linkedin"
                                value={formik.values.linkedin}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.linkedin && formik.errors.linkedin}
                            />
                            <CommonTextField
                                label="Google Link"
                                placeholder="Google Link"
                                name="google"
                                value={formik.values.google}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.google && formik.errors.google}
                            />
                            <CommonTextField
                                label="Youtube Link"
                                placeholder="Youtube Link"
                                name="youtube"
                                value={formik.values.youtube}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.youtube && formik.errors.youtube}
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