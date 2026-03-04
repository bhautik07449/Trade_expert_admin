import { useDispatch, useSelector } from "react-redux";
import BackPath from "../../../../components/common/BackPath";
import CommonBox from "../../../../components/common/common_box";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { fetchTradeType } from "../../../../store/slice/tradetypeSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import Tradeofferservice from "../../../../service/tradeoffer.service";

export default function AddTradeOffer() {
    const { id } = useParams()
    const [type, setType] = useState("");
    const [data, setData] = useState()

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchTradeType());
    }, []);


    const { flatList, loading } = useSelector(
        (state) => state.tradeType
    );

    const parentOptions = useMemo(() => {
        return flatList?.map((item) => ({
            label: item?.name,
            value: item?.id
        }));
    }, [flatList]);

    const initialValues = {
        trade_type: data ? data?.trade_type?.id : "",
        description: data ? data?.description : "",
        name: data ? data?.name : "",
    };

    const validationSchema = Yup.object().shape({
        trade_type: Yup.string().required("client select is required"),
        description: Yup.string().required("Description is required"),
        name: Yup.string().required("Name is required"),
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
                    description: values?.description
                };

                if (values.trade_type) {
                    payload.trade_type = { id: values.trade_type };
                }

                let res
                if (id) {
                    res = await Tradeofferservice.updateTradeoffer(id, payload)
                } else {
                    res = await Tradeofferservice.addTradeoffer(payload)
                }

                if (res) {
                    resetForm()
                    navigate("/website-management/content/trade-offer")
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
                const res = await Tradeofferservice.getByid(id);
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Trade Offer</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonBox
                                placeholders="Select Trade Type"
                                label="Trade Type"
                                name="trade_type"
                                options={parentOptions}
                                value={formik.values.trade_type}
                                onChange={(value) => formik.setFieldValue("trade_type", value)}
                                error={formik.touched.trade_type && formik.errors.trade_type}
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
                                label="Description"
                                placeholder="Description"
                                type="textarea"
                                name="description"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
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