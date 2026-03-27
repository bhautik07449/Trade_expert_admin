import CommonButton from "../../../../components/widgets/common_button";
import CommonBox from "../../../../components/common/common_box";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import { useFormik } from "formik";
import * as Yup from "yup";
import Settingservice from "../../../../service/setting.service";
import { useEffect, useState } from "react";
import { toast } from "../../../../components/ui/use-toast";

export default function GeneralSetting() {
    const [data, setData] = useState()

    const initialValues = {
        siteName: data?.siteName || "",
        adminEmail: data?.adminEmail || "",
        careerEmail: data?.careerEmail || "",
        phone: data?.phone || "",
        siteMail: data?.siteMail || "",
        siteMailName: data?.siteMailName || "",
        supportEmail: data?.supportEmail || "",
        certificationTitle: data?.certificationTitle || "",
        videoTitle: data?.videoTitle || "",
        homeMetaKeyword: data?.homeMetaKeyword || "",
        homeMetaDescription: data?.homeMetaDescription || "",
        siteMode: data?.siteMode || "",
        address: data?.address || "",
        state: data?.state || "",
        country: data?.country || "",
        latitude: data?.latitude || "",
        longitude: data?.longitude || "",
        homePageVideo: data?.homePageVideo || ""
    };

    const validationSchema = Yup.object().shape({
        siteName: Yup.string().required("Site name is required"),
        adminEmail: Yup.string()
            .email("Enter valid email")
            .required("Admin email is required"),
        careerEmail: Yup.string()
            .email("Enter valid email")
            .required("Career email is required"),
        phone: Yup.string().required("Phone number is required"),
        siteMail: Yup.string()
            .email("Enter valid email")
            .required("Site mail is required"),
        siteMailName: Yup.string().required("Site mail name is required"),
        supportEmail: Yup.string()
            .email("Enter valid email")
            .required("Support email is required"),
        certificationTitle: Yup.string().required("Certification title is required"),
        videoTitle: Yup.string().required("Video title is required"),
        homeMetaKeyword: Yup.string().required("Meta keyword is required"),
        homeMetaDescription: Yup.string().required("Meta description is required"),
        siteMode: Yup.string().required("Site mode is required"),
        address: Yup.string().required("Address is required"),
        state: Yup.string().required("State is required"),
        country: Yup.string().required("Country is required"),
        latitude: Yup.string().required("Latitude is required"),
        longitude: Yup.string().required("Longitude is required"),
        homePageVideo: Yup.string().required("Home page video is required")
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log("values", values);

            setSubmitting(true);
            try {
                const res = await Settingservice.updateGeneral(values)

                if (res) {
                    getData()
                    toast({
                        variant: "success",
                        title: "Update General Setting",
                        description: res?.data?.message,
                    });
                }

            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "General Setting Failed",
                    description: "General Setting Failed resubmit",
                });
            } finally {
                setSubmitting(false);
                resetForm()
            }
        }
    });

    const getData = async () => {
        try {
            const res = await Settingservice.getGeneral();
            if (res) {
                const data = res?.data
                setData(data)
            }

        } catch (error) {
            console.log(error, "error");
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">General Setting</h3>
            </div>
            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="cols-span-6 space-y-5">
                            <CommonTextField
                                label="Site Name"
                                placeholder="Site Name"
                                name="siteName"
                                value={formik.values.siteName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.siteName && formik.errors.siteName}
                            />
                            <CommonTextField
                                label="Site Admin Email address"
                                placeholder="Site Admin Email address"
                                name="adminEmail"
                                value={formik.values.adminEmail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.adminEmail && formik.errors.adminEmail}
                            />
                            <CommonTextField
                                label="Site Career Email address"
                                placeholder="Site Career Email address"
                                name="careerEmail"
                                value={formik.values.careerEmail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.careerEmail && formik.errors.careerEmail}
                            />
                            <CommonTextField
                                label="Site Phone number"
                                placeholder="Site Phone number"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && formik.errors.phone}
                            />
                            <CommonTextField
                                label="Site Mail address"
                                placeholder="Site Mail address"
                                name="siteMail"
                                value={formik.values.siteMail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.siteMail && formik.errors.siteMail}
                            />
                            <CommonTextField
                                label="Site Mail Name"
                                placeholder="Site Mail Name"
                                name="siteMailName"
                                value={formik.values.siteMailName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.siteMailName && formik.errors.siteMailName}
                            />
                            <CommonTextField
                                label="Support Email address"
                                placeholder="Support Email address"
                                name="supportEmail"
                                value={formik.values.supportEmail}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.supportEmail && formik.errors.supportEmail}
                            />
                            <CommonTextField
                                label="Certification Title"
                                placeholder="Certification Title"
                                name="certificationTitle"
                                value={formik.values.certificationTitle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.certificationTitle && formik.errors.certificationTitle}
                            />
                            <CommonTextField
                                label="Video Title"
                                placeholder="Video Title"
                                name="videoTitle"
                                value={formik.values.videoTitle}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.videoTitle && formik.errors.videoTitle}
                            />
                            <CommonTextField
                                label="Home Page Meta Keyword"
                                placeholder="Home Page Meta Keyword"
                                name="homeMetaKeyword"
                                value={formik.values.homeMetaKeyword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.homeMetaKeyword && formik.errors.homeMetaKeyword}
                            />
                            <CommonTextField
                                label="Home Page Meta Description"
                                placeholder="Home Page Meta Description"
                                name="homeMetaDescription"
                                value={formik.values.homeMetaDescription}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.homeMetaDescription && formik.errors.homeMetaDescription}
                            />
                        </div>
                        <div className="cols-span-6 space-y-5">
                            <CommonBox
                                label="Site Mode"
                                placeholders="Select Site Mode"
                                options={[
                                    { label: "Normal", value: "Normal" },
                                    { label: "Maintenance", value: "Maintenance" },
                                ]}
                                name="siteMode"
                                value={formik.values.siteMode}
                                onChange={(value) => formik.setFieldValue("siteMode", value)}
                                error={formik.touched.siteMode && formik.errors.siteMode}
                            />
                            <CommonTextField
                                label="Site Address"
                                placeholder="Site Address"
                                name="address"
                                value={formik.values.address}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.address && formik.errors.address}
                            />
                            <CommonTextField
                                label="Site State"
                                placeholder="Site State"
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.state && formik.errors.state}
                            />
                            <CommonTextField
                                label="Site Country"
                                placeholder="Site Country"
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.country && formik.errors.country}
                            />
                            <CommonTextField
                                label="Map Latitude"
                                placeholder="Map Latitude"
                                name="latitude"
                                value={formik.values.latitude}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.latitude && formik.errors.latitude}
                            />
                            <CommonTextField
                                label="Map Longitude"
                                placeholder="Map Longitude"
                                name="longitude"
                                value={formik.values.longitude}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.longitude && formik.errors.longitude}
                            />
                            <CommonTextField
                                type="textarea"
                                label="Home page Video"
                                placeholder="Home page Video"
                                name="homePageVideo"
                                value={formik.values.homePageVideo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.homePageVideo && formik.errors.homePageVideo}
                            />
                        </div>
                    </div>
                    <CommonButton type="submit" disabled={formik.isSubmitting}>
                        {formik.isSubmitting ? "Adding..." : "Save"}
                    </CommonButton>
                </form>
            </Card>
        </div >
    )
}