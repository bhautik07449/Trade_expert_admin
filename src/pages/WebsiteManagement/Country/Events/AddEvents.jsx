import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import Eventsservice from "../../../../service/events.service";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import ImageUploadField from "../../../../components/common/ImageUploadField";

export default function AddEvents() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()

    const initialValues = {
        tag: data ? data?.tag : "",
        title: data ? data?.title : "",
        description: data ? data?.description : "",
        image: data ? data?.image : "",
    };

    const validationSchema = Yup.object().shape({
        tag: Yup.string().required("Tag is required"),
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
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
                    res = await Eventsservice.updateEvents(id, values)
                } else {
                    res = await Eventsservice.addEvents(values);
                }
                resetForm()
                navigate("/website-management/country/events")
                toast({
                    variant: "success",
                    title: "Events",
                    description: res?.data?.message,
                });
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Events Failed",
                    description: error?.response?.data?.message || "Events Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await Eventsservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setData(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Events Details Error",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Events</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="Tag"
                                placeholder="Tag"
                                name="tag"
                                value={formik.values.tag}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tag && formik.errors.tag}
                            />

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
                                type="textarea"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
                            />

                            <div className="space-y-5">
                                <ImageUploadField
                                    value={formik.values.image}
                                    onImageUpload={(url) => {
                                        formik.setFieldValue("image", url);
                                    }} />
                            </div>
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