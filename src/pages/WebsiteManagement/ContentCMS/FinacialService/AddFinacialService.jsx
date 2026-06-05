import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import Abctypeservice from "../../../../service/abctype.service";
import CountrySelection from "../../../../components/widgets/country_selection";
import FinancialServiceservice from "../../../../service/finacialservice.service";

export default function AddFinacialService() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [list, setList] = useState()

    const initialValues = {
        name: list ? list?.name : "",
        description: list ? list?.description : "",
        country: list ? list?.country : "",
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
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
                    res = await FinancialServiceservice.updateFinancialService(id, values)
                } else {
                    res = await FinancialServiceservice.addFinancialService(values);
                }
                resetForm()
                navigate("/website-management/content/finacial_service")
                toast({
                    variant: "success",
                    title: "Finacial Service",
                    description: res?.data?.message,
                });
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Finacial Service Failed",
                    description: error?.response?.data?.message || "Finacial Service Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await FinancialServiceservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setList(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Finacial Service Details Error",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Finacial Service</h3>
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
                                rows={8}
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
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