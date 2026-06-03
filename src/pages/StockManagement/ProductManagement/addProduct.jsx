import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";
import BasicInfo from "./Tabs/basic_info";
import SEO from "./Tabs/seo";
import Image from "./Tabs/image";
import Details from "./Tabs/details";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import CommonButton from "../../../components/widgets/common_button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/slice/categoriesSlice";
import { fetchFlatMeasurement } from "../../../store/slice/measurementSlice";
import Productservice from "../../../service/product.service";
import { toast } from "../../../components/ui/use-toast";
import OfferCheck from "./Tabs/OfferCheck";

export default function AddProduct() {
    const { id } = useParams()
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("basic_info");
    const [data, setData] = useState()

    const dispatch = useDispatch();

    const { categories } = useSelector(
        (state) => state.categories
    );

    const { flatList } = useSelector(
        (state) => state.measurements
    );

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchFlatMeasurement())
    }, [dispatch]);

    const validationSchema = Yup.object({
        name: Yup.string().required("Product name is required"),
        price: Yup.number()
            .typeError("Price must be number")
            .required("Price is required"),
        measure: Yup.string().required("Measure is required"),
        teriff: Yup.string().required("Teriff is required"),
        slug: Yup.string().required("Slug is required"),
        category: Yup.string().required("Category is required"),
        // subCategory: Yup.string().required("Sub Category is required"),
        pageTitle: Yup.string().required("Page title is required"),
        metaKeywords: Yup.string().required("Meta keywords required"),
        metaDescription: Yup.string().required("Meta description required"),
        seasonalChart: Yup.string().required("Seasonal chart required"),
    });

    const initialValues = {
        name: data ? data?.name : "",
        price: data ? data?.price : "",
        measure: data ? data?.measure?.id : "",
        teriff: data ? data?.teriff : "",
        slug: data ? data?.slug : "",
        category: data ? data?.category?.id : "",
        subCategory: data ? data?.subcategory?.id : "",
        newArrival: data ? data?.newArrival : true,
        trending: data ? data?.trending : false,
        featured: data ? data?.featured : false,
        description: data ? data?.description : "",
        policy: data ? data?.policy : "",
        seasonalChart: data ? data?.seasonalChart : "",
        pageTitle: data ? data?.pageTitle : "",
        metaKeywords: data ? data?.metaKeywords : "",
        metaDescription: data ? data?.metaDescription : "",
        shipmentmanual: data ? data?.shipmentmanual : [],
        technicalSpecification: data ? data?.technicalSpecification : [],
        commercialAspect: data ? data?.commercialAspect : [],
        images: data ? data?.images : [],
        certification: data ? data?.certification : '',
        season: data ? data?.season : 'All',
        country: data ? data?.country : "",
        offer_type: data ? data?.offer_type?.id : "",
        status: data ? data?.status : 'Indenting',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            console.log("values", values);

            setSubmitting(true);

            try {
                let res

                if (id) {
                    res = await Productservice.updateProduct(id, values)
                } else {
                    res = await Productservice.addProduct(values)
                }

                if (res) {
                    resetForm()
                    navigate("/stock-management/product_management")
                    toast({
                        variant: "success",
                        title: "Product",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Product Failed",
                    description: error?.response?.data?.message || "Product Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    const goNext = async () => {
        const errors = await formik.validateForm();

        if (activeTab === "basic_info" && errors.name) return;

        if (activeTab === "basic_info") setActiveTab("details");
        else if (activeTab === "details") setActiveTab("image");
        else if (activeTab === "image") setActiveTab("offer");
        else if (activeTab === "offer") setActiveTab("seo")
    };

    const goBack = () => {
        if (activeTab === "seo") setActiveTab("offer");
        else if (activeTab === "offer") setActiveTab("image")
        else if (activeTab === "image") setActiveTab("details");
        else if (activeTab === "details") setActiveTab("basic_info");
    };

    const getData = async (id) => {
        try {
            const res = await Productservice.getById(id)
            if (res) {
                setData(res?.data?.data)
            }
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (id) {
            getData(id)
        }
    }, [id])

    if (id && !data) {
        return <div className="p-6">Loading...</div>;
    }

    return (
        <div className="grid gap-6">
            <div className="flex justify-between items-center gap-4">
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Product</h3>
                <BackPath />
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") e.preventDefault();
                }}
            >
                <Card className="p-6">
                    <Tabs value={activeTab} onValueChange={(val) => setActiveTab(val)}>
                        <TabsList>
                            <TabsTrigger type="button" value="basic_info">Basic Info</TabsTrigger>
                            <TabsTrigger type="button" value="details">Details</TabsTrigger>
                            <TabsTrigger type="button" value="image">Image</TabsTrigger>
                            <TabsTrigger type="button" value="offer">Offer</TabsTrigger>
                            <TabsTrigger type="button" value="seo">SEO</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic_info">
                            <BasicInfo formik={formik} categories={categories} flatList={flatList} />
                        </TabsContent>
                        <TabsContent value="seo">
                            <SEO formik={formik} />
                        </TabsContent>
                        <TabsContent value="image">
                            <Image formik={formik} />
                        </TabsContent>
                        <TabsContent value="offer">
                            <OfferCheck formik={formik} />
                        </TabsContent>
                        <TabsContent value="details">
                            <Details formik={formik} />
                        </TabsContent>
                    </Tabs>

                    <div className="flex justify-between mt-6">
                        {activeTab !== "basic_info" && (
                            <CommonButton
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    goBack();
                                }}
                            >
                                Back
                            </CommonButton>
                        )}

                        {activeTab !== "seo" ? (
                            <CommonButton
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault();
                                    goNext();
                                }}
                            >
                                Next
                            </CommonButton>
                        ) : (
                            <CommonButton type="submit" isLoading={formik.isSubmitting}>
                                Save Product
                            </CommonButton>
                        )}
                    </div>
                </Card>
            </form>
        </div>
    );
}