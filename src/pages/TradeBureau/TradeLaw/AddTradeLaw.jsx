import { useNavigate, useParams } from "react-router";
import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";
import CommonButton from "../../../components/widgets/common_button";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../components/ui/use-toast";
import TradeBureauService from "../../../service/tradebureau.service";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { Badge } from "../../../components/ui/badge";
import { X } from "lucide-react";
import CountrySelection from "../../../components/widgets/country_selection";
import { CommonTextField } from "../../../components/widgets/common_textField";

export default function AddTradeLaw() {
    const { id } = useParams()
    const [data, setData] = useState()

    const navigate = useNavigate()

    const initialValues = {
        department: data ? data?.department : "",
        country: data ? data?.country : "",
        act_details: data ? data?.act_details : "",
        more_details: data ? data?.more_details : "",
        usefull_when: data?.usefull_when || [],
        use_case: data ? data?.use_case : "",
    };

    const validationSchema = Yup.object().shape({
        department: Yup.string().required("Department is required"),
        country: Yup.string().required("Country is required"),
        act_details: Yup.string().required("Act Details is required"),
        more_details: Yup.string().required("More Details is required"),
        usefull_when: Yup.array().min(1, "At least one value is required").required("Useful When is required"),
        use_case: Yup.string().url("Must be a valid URL").required("Use Case is required")
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
                    res = await TradeBureauService.updateTradeLaw(id, values)
                } else {
                    res = await TradeBureauService.addTradeLaw(values);
                }
                resetForm()
                navigate("/trade_bureau/trade_law")
                toast({
                    variant: "success",
                    title: "Trade Law",
                    description: res?.data?.message || (id ? "Trade Law updated successfully" : "Trade Law added successfully"),
                });
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Trade Law Error",
                    description: error?.response?.data?.message || "Failed to submit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await TradeBureauService.getTradeLawByid(id);
                if (res) {
                    const fetchedData = res?.data?.data || res?.data
                    setData(fetchedData)
                }
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Get Trade Law Error",
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Trade Law</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <div className="grid gap-2">
                                <CommonTextField
                                    label="Department"
                                    placeholder="Enter Department"
                                    name="department"
                                    value={formik.values.department}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.department && !formik.values.department && "Department is required"}
                                />
                            </div>

                            <CountrySelection formik={formik} />

                            <div className="grid gap-2">
                                <CommonTextField
                                    label="Act Details"
                                    placeholder="Enter Act Details"
                                    name="act_details"
                                    value={formik.values.act_details}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.act_details && !formik.values.act_details && "Act details is required"}
                                />
                            </div>

                            <div className="grid gap-2">
                                <CommonTextField
                                    label="Use Case (URL)"
                                    placeholder="Enter Use Case URL"
                                    name="use_case"
                                    value={formik.values.use_case}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.use_case && !formik.values.use_case && "Use case URL is required"}
                                />
                                {formik.values.use_case && (
                                    (() => {
                                        const match = formik.values.use_case.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
                                        if (match) {
                                            return (
                                                <div className="mt-2 rounded-md overflow-hidden bg-muted aspect-video relative max-w-[200px] border">
                                                    <iframe
                                                        className="absolute top-0 left-0 w-full h-full"
                                                        src={`https://www.youtube.com/embed/${match[1]}`}
                                                        title="YouTube video player"
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })()
                                )}
                            </div>

                            <div className="grid gap-2">
                                <Label>Useful When (Press Enter to add)</Label>
                                {Array.isArray(formik.values.usefull_when) && formik.values.usefull_when.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {formik.values.usefull_when.map((tag, index) => (
                                            <Badge key={index} variant="secondary" className="px-2 py-1 flex items-center gap-1 font-normal">
                                                {tag}
                                                <X
                                                    className="w-3 h-3 cursor-pointer"
                                                    onClick={() => {
                                                        const newTags = formik.values.usefull_when.filter((_, i) => i !== index);
                                                        formik.setFieldValue("usefull_when", newTags);
                                                    }}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                                <Input
                                    placeholder="Type and press enter..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            const val = e.target.value.trim();
                                            const currentTags = Array.isArray(formik.values.usefull_when) ? formik.values.usefull_when : [];
                                            if (val && !currentTags.includes(val)) {
                                                formik.setFieldValue("usefull_when", [...currentTags, val]);
                                                e.target.value = '';
                                            }
                                        }
                                    }}
                                />
                                {formik.touched.usefull_when && formik.errors.usefull_when && (
                                    <p className="text-destructive text-xs">{formik.errors.usefull_when}</p>
                                )}
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="grid gap-2">
                                <CommonTextField
                                    label="More Details"
                                    placeholder="Enter More Details"
                                    name="more_details"
                                    type="textarea"
                                    rows={6}
                                    value={formik.values.more_details}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.more_details && !formik.values.more_details && "More details are required"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/trade_bureau/trade_law")}
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