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
import { toast } from "../../../../components/ui/use-toast";
import { fetchCategories } from "../../../../store/slice/categoriesSlice";
import { fetchProducts } from "../../../../store/slice/productSlice";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../../components/ui/table";
import { Trash2 } from "lucide-react";

export default function AddTradeOffer() {
    const { id } = useParams()
    const [data, setData] = useState()

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchTradeType());
        dispatch(fetchCategories());
        dispatch(fetchProducts());
    }, []);

    const { categories } = useSelector(
        (state) => state.categories
    );

    const { flatList, loading } = useSelector(
        (state) => state.tradeType
    );

    const { list } = useSelector(
        (state) => state.products
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
        category: "",
        subCategory: "",
        product: "",
        hsncode: "",
        quantity: "",
        unit_measurement: "",
        packing_configure: "",
        actual_price: "",
        discounted_price: "",
        items: data ? data?.items || [] : [],
    };

    const validationSchema = Yup.object().shape({
        trade_type: Yup.string().required("Trade type is required"),
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
                    description: values?.description,
                    trade_type: { id: values.trade_type },
                    items: values.items.map((item) => ({
                        category: { id: item.category },
                        subCategory: { id: item.subCategory },
                        product: { id: item.product },
                        hsncode: item.hsncode,
                        quantity: item.quantity,
                        unit_measurement: item.unit_measurement,
                        packing_configure: item.packing_configure,
                        actual_price: item.actual_price,
                        discounted_price: item.discounted_price,
                    }))
                };

                let res
                if (id) {
                    res = await Tradeofferservice.updateTradeoffer(id, payload)
                } else {
                    res = await Tradeofferservice.addTradeoffer(payload)
                }

                if (res) {
                    resetForm()
                    navigate("/website-management/content/trade-offer")
                    toast({
                        variant: "success",
                        title: "Trade Offer",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                console.log("error", error);
                toast({
                    variant: "error",
                    title: "Trade Offer Failed",
                    description: "Trade Offer Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

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

    const handleAddItem = () => {
        const { category, subCategory, product, hsncode, quantity, unit_measurement, packing_configure, actual_price, discounted_price } = formik.values;

        if (!category || !subCategory || !product || !quantity || !actual_price) {
            toast({
                variant: "error",
                title: "Validation Error",
                description: "Please fill all required fields before adding an item.",
            });
            return;
        }

        const newItem = {
            category: { id: category, name: categoryOptions.find(c => c.value === category)?.label },
            subCategory: { id: subCategory, name: subCategoryOptions.find(s => s.value === subCategory)?.label },
            product: { id: product, name: productOptions.find(p => p.value === product)?.label },
            hsncode,
            quantity,
            unit_measurement,
            packing_configure,
            actual_price,
            discounted_price,
        };

        formik.setFieldValue("items", [...formik.values.items, newItem]);

        formik.setFieldValue("category", "");
        formik.setFieldValue("subCategory", "");
        formik.setFieldValue("product", "");
        formik.setFieldValue("hsncode", "");
        formik.setFieldValue("quantity", "");
        formik.setFieldValue("unit_measurement", "");
        formik.setFieldValue("packing_configure", "");
        formik.setFieldValue("actual_price", "");
        formik.setFieldValue("discounted_price", "");
    };

    const handleRemoveItem = (index) => {
        const updatedItems = formik.values.items.filter((_, i) => i !== index);
        formik.setFieldValue("items", updatedItems);
    };

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

                    {id && (
                        <>
                            <div className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <CommonBox
                                        label="Category"
                                        placeholders="Select Category"
                                        options={categoryOptions}
                                        name="category"
                                        value={formik.values.category}
                                        onChange={(value) => {
                                            formik.setFieldValue("category", value);
                                            formik.setFieldValue("subCategory", "");
                                        }}
                                        error={formik.touched.category && formik.errors.category}
                                    />

                                    <CommonBox
                                        label="Sub Category"
                                        placeholders="Select Sub Category"
                                        options={subCategoryOptions}
                                        name="subCategory"
                                        value={formik.values.subCategory}
                                        onChange={(value) => formik.setFieldValue("subCategory", value)}
                                        error={formik.touched.subCategory && formik.errors.subCategory}
                                    />

                                    <CommonBox
                                        label="Product"
                                        placeholders="Select Product"
                                        options={productOptions}
                                        name="product"
                                        value={formik.values.product}
                                        onChange={(value) => formik.setFieldValue("product", value)}
                                        error={formik.touched.product && formik.errors.product}
                                    />

                                    <CommonTextField
                                        label="Hsncode"
                                        placeholder="Hsncode"
                                        name="hsncode"
                                        value={formik.values.hsncode}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <CommonTextField
                                        label="Quantity"
                                        placeholder="Quantity"
                                        name="quantity"
                                        value={formik.values.quantity}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <CommonTextField
                                        label="Unit Measurement"
                                        placeholder="Unit Measurement"
                                        name="unit_measurement"
                                        value={formik.values.unit_measurement}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <CommonTextField
                                        label="Packing Configure"
                                        placeholder="Packing Configure"
                                        name="packing_configure"
                                        value={formik.values.packing_configure}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <CommonTextField
                                        label="Actual Price"
                                        placeholder="Actual Price"
                                        name="actual_price"
                                        value={formik.values.actual_price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <CommonTextField
                                        label="Discounted Price"
                                        placeholder="Discounted Price"
                                        name="discounted_price"
                                        value={formik.values.discounted_price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <CommonButton type="button" onClick={handleAddItem}>
                                        Add Item
                                    </CommonButton>
                                </div>
                            </div>

                            {formik.values.items.length > 0 && (
                                <div className="mt-6">
                                    <h4 className="h6-bold mb-4">Added Items</h4>
                                    <div className="border rounded-lg overflow-hidden">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Category</TableHead>
                                                    <TableHead>Sub Category</TableHead>
                                                    <TableHead>Product</TableHead>
                                                    <TableHead>HSN code</TableHead>
                                                    <TableHead>Quantity</TableHead>
                                                    <TableHead>Price</TableHead>
                                                    <TableHead className="text-right">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {formik.values.items.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{item.category?.name}</TableCell>
                                                        <TableCell>{item.subCategory?.name}</TableCell>
                                                        <TableCell>{item.product?.name}</TableCell>
                                                        <TableCell>{item.hsncode}</TableCell>
                                                        <TableCell>{item.quantity} {item.unit_measurement}</TableCell>
                                                        <TableCell>{item.actual_price}</TableCell>
                                                        <TableCell className="text-right">
                                                            <CommonButton
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleRemoveItem(index)}
                                                            >
                                                                <Trash2 className="w-4 h-4 text-destructive" />
                                                            </CommonButton>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                    {formik.touched.items && formik.errors.items && (
                                        <p className="text-sm text-destructive mt-2">{formik.errors.items}</p>
                                    )}
                                </div>
                            )}
                        </>
                    )}
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