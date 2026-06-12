import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import CountrySelection from "../../../../components/widgets/country_selection";
import ResourcesService from "../../../../service/resources.service";

export default function AddAffiliation() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()

    const initialValues = {
        image: data ? data?.image : "",
        country: data ? data?.country : ""
    };

    const validationSchema = Yup.object().shape({
        image: Yup.string().required("Image is required"),
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
                    res = await ResourcesService.updateAffiliation(id, values)
                } else {
                    res = await ResourcesService.addAffiliation(values);
                }
                resetForm()
                navigate("/website-management/section-management/affiliation")
                toast({
                    variant: "success",
                    title: "Affiliation Resources",
                    description: res?.data?.message,
                });
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Affiliation Resources Failed",
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
                const res = await ResourcesService.getAffiliationByid(id);
                if (res) {
                    const data = res?.data?.data
                    setData(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Affiliation Resources Details Error",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Affiliation Resources</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
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