import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import CommonBox from "../../../../components/common/common_box";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTradeoffer } from "../../../../store/slice/tradeofferSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import Traderequestservice from "../../../../service/traderequest.service";
import { toast } from "../../../../components/ui/use-toast";

export default function AddOfferRequest() {
    const { id } = useParams()
    const [data, setData] = useState()

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchTradeoffer());
    }, []);


    const { flatList, loading } = useSelector(
        (state) => state.tradeOffer
    );

    const parentOptions = useMemo(() => {
        return flatList?.map((item) => ({
            label: item?.name,
            value: item?.id
        }));
    }, [flatList]);

    const initialValues = {
        name: data ? data?.name : "",
        email: data ? data?.email : "",
        phone: data ? data?.phone : "",
        message: data ? data?.message : "",
        trade_offer: data ? data?.trade_offer?.id : ""
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("email is required"),
        phone: Yup.number().required("phone is required"),
        message: Yup.string().required("message is required"),
        trade_offer: Yup.string().required("client select is required")
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
                    email: values?.email,
                    phone: values?.phone,
                    message: values?.message
                };

                if (values.trade_offer) {
                    payload.trade_offer = { id: values.trade_offer };
                }

                let res
                if (id) {
                    res = await Traderequestservice.updateTraderequest(id, payload)
                } else {
                    res = await Traderequestservice.addTraderequest(payload)
                }

                if (res) {
                    resetForm()
                    navigate("/website-management/content/offer_req")
                    toast({
                        variant: "success",
                        title: "Offer Req.",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Offer Req. Failed",
                    description: "Offer Req. Failed resubmit",
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
                const res = await Traderequestservice.getByid(id);
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Trade Offer Request</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonBox
                                placeholders="Select Trade Offer"
                                label="Trade Offer"
                                name="trade_offer"
                                options={parentOptions}
                                value={formik.values.trade_offer}
                                onChange={(value) => formik.setFieldValue("trade_offer", value)}
                                error={formik.touched.trade_offer && formik.errors.trade_offer}
                            />
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
                                label="Email"
                                placeholder="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email}
                            />
                            <CommonTextField
                                label="Phone"
                                placeholder="Phone"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && formik.errors.phone}
                            />
                            <CommonTextField
                                label="Message"
                                placeholder="Message"
                                type="textarea"
                                rows={6}
                                name="message"
                                value={formik.values.message}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.message && formik.errors.message}
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