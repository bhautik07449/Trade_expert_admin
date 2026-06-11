import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import CountrySelection from "../../../../components/widgets/country_selection";
import Deliveryreachservice from "../../../../service/deliveryreach.service";

export default function AddDeliveryReach() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()

    const initialValues = {
        country: data ? data?.country : "",
        description: data ? data?.description : ""
    };

    const validationSchema = Yup.object().shape({
        country: Yup.string().required("Country is required"),
        description: Yup.string().required("Description is required"),
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
                    res = await Deliveryreachservice.updateDeliveryreach(id, values)
                } else {
                    res = await Deliveryreachservice.addDeliveryreach(values);
                }
                resetForm()
                navigate("/website-management/content/delivery_reach")
                toast({
                    variant: "success",
                    title: "Delivery Reach",
                    description: res?.data?.message,
                });
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Delivery Reach Failed",
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
                const res = await Deliveryreachservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setData(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Delivery Reach Failed",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Delivery Reach</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CountrySelection formik={formik} />

                            <CommonTextField
                                label="Description"
                                placeholder="Description"
                                type="textarea"
                                rows={10}
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
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