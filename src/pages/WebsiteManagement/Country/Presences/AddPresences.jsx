import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import PresencesService from "../../../../service/presences.service";
import CountrySelection from "../../../../components/widgets/country_selection";

export default function AddPresences() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [data, setData] = useState()

    const initialValues = {
        country: data ? data?.country : ""
    };

    const validationSchema = Yup.object().shape({
        country: Yup.string().required("Country is required"),
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
                    res = await PresencesService.updatePresences(id, values)
                } else {
                    res = await PresencesService.addPresences(values);
                }
                resetForm()
                navigate("/website-management/country/presences")
                toast({
                    variant: "success",
                    title: "Presences",
                    description: res?.data?.message,
                });
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Presences Failed",
                    description: error?.response?.data?.message || error?.message || "Presences Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await PresencesService.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setData(data)
                }

            } catch (error) {
                console.log(error, "error");
                toast({
                    variant: "error",
                    title: "Fetch Failed",
                    description: error?.response?.data?.message || error?.message || "Failed to fetch presence data",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Presences</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
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