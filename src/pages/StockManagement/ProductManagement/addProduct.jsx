import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";
import BasicInfo from "./Tabs/basic_info";
import SEO from "./Tabs/seo";
import Image from "./Tabs/image";
import Details from "./Tabs/details";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import CommonButton from "../../../components/widgets/common_button";
import { useState } from "react";

export default function AddProduct() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("basic_info");
    console.log("activeTab", activeTab);

    const initialValues = {
        name: "",
        price: "",
        measure: "",
        teriff: "",
        slug: "",
        category: "",
        subCategory: "",
        newArrival: false,
        trending: false,
        featured: false,
        seasonalChart: "",
        pageTitle: "",
        metaKeywords: "",
        metaDescription: "",
    };

    const formik = useFormik({
        initialValues,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
                resetForm()
                navigate("/stock-management/product_management")
            } catch (error) {
                console.log("error", error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    const goNext = () => {
        if (activeTab === "basic_info") setActiveTab("details");
        else if (activeTab === "details") setActiveTab("image");
        else if (activeTab === "image") setActiveTab("seo");
    };

    const goBack = () => {
        if (activeTab === "seo") setActiveTab("image");
        else if (activeTab === "image") setActiveTab("details");
        else if (activeTab === "details") setActiveTab("basic_info");
    };

    return (
        <div className="grid gap-6">
            <div className="flex justify-between items-center gap-4">
                <h3 className="h5-bold">Add Product</h3>
                <BackPath />
            </div>
            <Card className="p-6">
                <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val)}>
                    <TabsList>
                        <TabsTrigger value="basic_info">Basic Info</TabsTrigger>
                        <TabsTrigger value="details">Details</TabsTrigger>
                        <TabsTrigger value="image">Image</TabsTrigger>
                        <TabsTrigger value="seo">SEO</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic_info">
                        <BasicInfo formik={formik} />
                    </TabsContent>
                    <TabsContent value="seo">
                        <SEO formik={formik} />
                    </TabsContent>
                    <TabsContent value="image">
                        <Image formik={formik} />
                    </TabsContent>
                    <TabsContent value="details">
                        <Details formik={formik} />
                    </TabsContent>
                </Tabs>

                <div className="flex justify-between mt-6">
                    {activeTab !== "basic_info" && (
                        <CommonButton type="button" onClick={goBack}>
                            Back
                        </CommonButton>
                    )}

                    {activeTab !== "seo" ? (
                        <CommonButton type="button" onClick={goNext}>
                            Next
                        </CommonButton>
                    ) : (
                        <CommonButton type="submit" onClick={formik.handleSubmit}>
                            Save Product
                        </CommonButton>
                    )}
                </div>
            </Card>
        </div>
    );
}