import CommonButton from "../../../../components/widgets/common_button";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Homebannerservice from "../../../../service/homebanner.service";

export default function AddHomeBanner() {
    const { id } = useParams()
    const [data, setData] = useState()

    const navigate = useNavigate()

    const initialValues = {
        image: data ? data?.image : ""
    };

    const validationSchema = Yup.object().shape({
        image: Yup.string().required("Name is required")
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
                }
            } catch (error) {
                console.log("error", error);
            } finally {
                setSubmitting(false);
                resetForm()
            }
        }
    });

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
                                }} />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton type="button" variant="outline">
                            Cancel
                        </CommonButton>

                        <CommonButton type="submit" disabled={formik.isSubmitting}>
                            {formik.isSubmitting ? "Adding..." : id ? "Edit" : "Add"}
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    )
}