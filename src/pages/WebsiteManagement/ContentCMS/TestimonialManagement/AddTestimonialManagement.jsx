import CommonBox from "../../../../components/common/common_box";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { fetchClient } from "../../../../store/slice/clientSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import Testimonialservice from "../../../../service/testimonial.service";
import { toast } from "../../../../components/ui/use-toast";

export default function AddTestimonialManagement() {
    const [data, setData] = useState()
    const { id } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchClient());
    }, []);


    const { list, loading } = useSelector(
        (state) => state.client
    );

    const parentOptions = useMemo(() => {
        return list?.map((item) => ({
            label: item?.first_name + " " + item?.last_name,
            value: item?.id
        }));
    }, [list]);

    const initialValues = {
        review: data ? data?.review : "",
        client: data ? data?.client?.id : "",
    };

    const validationSchema = Yup.object().shape({
        review: Yup.string().required("Review is required"),
        client: Yup.string().required("client select is required")
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log("values", values);

            setSubmitting(true);
            try {

                const payload = {
                    name: values?.name,
                    review: values?.review
                };

                if (values.client) {
                    payload.client = { id: values.client };
                }

                let res
                if (id) {
                    res = await Testimonialservice.updateTestimonial(id, payload)
                } else {
                    res = await Testimonialservice.addTestimonial(payload)
                }

                if (res) {
                    resetForm()
                    navigate("/website-management/content/testinomial")
                    toast({
                        variant: "success",
                        title: "Testinomial",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Testinomial Failed",
                    description: error?.response?.data?.message || "Testinomial Failed resubmit",
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
                const res = await Testimonialservice.getByid(id);
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Testimonial</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonBox
                                placeholders="Select Client"
                                label="Client"
                                name="client"
                                options={parentOptions}
                                value={formik.values.client}
                                onChange={(value) => formik.setFieldValue("client", value)}
                                error={formik.touched.client && formik.errors.client}
                            />

                            <CommonTextField
                                label="Review"
                                placeholder="Review"
                                type="textarea"
                                name="review"
                                value={formik.values.review}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.review && formik.errors.review}
                            />
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