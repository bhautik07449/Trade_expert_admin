import CommonButton from "../../../../components/widgets/common_button";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import Galleryservice from "../../../../service/gallery.service";
import { toast } from "../../../../components/ui/use-toast";
import CountrySelection from "../../../../components/widgets/country_selection";

export default function AddGallery() {
    const { id } = useParams()
    const [data, setData] = useState()

    const navigate = useNavigate()

    const initialValues = {
        name: data ? data?.name : "",
        description: data ? data?.description : "",
        image: data ? data?.image : "",
        sr_no: data ? data?.sr_no : "",
        country: data ? data?.country : ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        image: Yup.string().required("Image is required"),
        sr_no: Yup.number().required("position number is required"),
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
                    res = await Galleryservice.updateGallery(id, values)
                } else {
                    res = await Galleryservice.addGallery(values)
                }

                if (res) {
                    resetForm()
                    navigate("/website-management/pages-management/gallery")
                    toast({
                        variant: "success",
                        title: "Gallery",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Gallery Failed",
                    description: error?.response?.data?.message || "Gallery Failed resubmit",
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
                const res = await Galleryservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setData(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Gallery Data Fetch Error",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Gallery</h3>
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
                            <CountrySelection formik={formik} />
                            <ImageUploadField
                                value={formik.values.image}
                                onImageUpload={(url) => {
                                    formik.setFieldValue("image", url);
                                }} />
                            <CommonTextField
                                label="Sr No"
                                placeholder="Enter Position"
                                type="number"
                                name="sr_no"
                                value={formik.values.sr_no}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.sr_no && formik.errors.sr_no}
                            />
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