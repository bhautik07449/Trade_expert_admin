import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import { fetchProducts } from "../../../../store/slice/productSlice";
import { fetchCategories } from "../../../../store/slice/categoriesSlice";
import CommonBox from "../../../../components/common/common_box";
import MultiSelectBox from "../../../../components/common/MultiSelectBox";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductName } from "../../../../store/slice/productnameSlice";
import CountryProductService from "../../../../service/countryproduct.service";
import CountrySelection from "../../../../components/widgets/country_selection";

export default function AddProductList() {
    const { id } = useParams()
    const [data, setData] = useState()
    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchProducts());
        dispatch(fetchProductName())
    }, []);

    const { categories } = useSelector(
        (state) => state.categories
    );

    const { list } = useSelector(
        (state) => state.products
    );

    const { type } = useSelector(
        (state) => state.productname
    );

    const initialValues = {
        productname: data ? data?.productname?.id : "",
        category: data ? data?.category?.id : "",
        subcategory: data ? data?.subcategory?.id : "",
        products: data ? data?.products?.map((p) => p.id) : [],
        country: data?.country || "",
    };

    const validationSchema = Yup.object().shape({
        productname: Yup.string().required("Product Name is required"),
        category: Yup.string().required("Category is required"),
        subcategory: Yup.string().required("Sub Category is required"),
        products: Yup.array().min(1, "At least one product is required").required("Products are required"),
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
                    res = await CountryProductService.updateProduct(id, values)
                } else {
                    res = await CountryProductService.addProduct(values);
                }
                resetForm()
                navigate("/website-management/country/product-list")
                toast({
                    variant: "success",
                    title: "Product",
                    description: res?.data?.message,
                });
            } catch (error) {
                console.log("error", error);
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

    const productnameOptions = useMemo(() => {
        return type?.map((item) => ({
            label: item?.name,
            value: item?.id
        }));
    }, [type]);

    const productOptions = useMemo(() => {
        return list?.map((item) => ({
            label: item?.name,
            value: item?.id
        }));
    }, [list]);

    const categoryOptions = useMemo(() => {
        return categories?.map((cat) => ({
            label: cat.name,
            value: cat.id
        }));
    }, [categories]);

    const selectedCategory = categories?.find(
        (cat) => cat.id === formik.values.category
    );

    const subCategoryOptions = useMemo(() => {
        if (!selectedCategory) return [];

        return selectedCategory.children?.map((sub) => ({
            label: sub.name,
            value: sub.id
        })) || [];
    }, [selectedCategory]);

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await CountryProductService.getProductByid(id);
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
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Products</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonBox
                                label="Product Name"
                                placeholders="Select Product Name"
                                options={productnameOptions}
                                name="productname"
                                value={formik.values.productname}
                                onChange={(value) => formik.setFieldValue("productname", value)}
                                error={formik.touched.productname && formik.errors.productname}
                            />

                            <CommonBox
                                label="Category"
                                placeholders="Select Category"
                                options={categoryOptions}
                                name="category"
                                value={formik.values.category}
                                onChange={(value) => {
                                    formik.setFieldValue("category", value);
                                    formik.setFieldValue("subcategory", "");
                                }}
                                error={formik.touched.category && formik.errors.category}
                            />

                            <CommonBox
                                label="Sub Category"
                                placeholders="Select Sub Category"
                                options={subCategoryOptions}
                                name="subcategory"
                                value={formik.values.subcategory}
                                onChange={(value) => formik.setFieldValue("subcategory", value)}
                                error={formik.touched.subcategory && formik.errors.subcategory}
                            />

                            <MultiSelectBox
                                label="Product"
                                placeholders="Select Product"
                                options={productOptions}
                                name="products"
                                value={formik.values.products}
                                onChange={(value) => formik.setFieldValue("products", value)}
                                error={formik.touched.products && formik.errors.products}
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
                            disabled={formik.isSubmitting || !formik.isValid}
                        >
                            {formik.isSubmitting ? "Saving..." : id ? "Update" : "Add"}
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    )
}