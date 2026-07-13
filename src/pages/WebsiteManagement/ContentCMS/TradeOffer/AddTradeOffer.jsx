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
import CountrySelection from "../../../../components/widgets/country_selection";
import DealerFields from "./components/DealerFields";
import TenderFields from "./components/TenderFields";
import AssociationFields from "./components/AssociationFields";
import { fetchFranchise } from "../../../../store/slice/franchiseSlice";
import ReadyStock from "./components/ReadyStock";

export default function AddTradeOffer() {
    const { id } = useParams()
    const [data, setData] = useState()

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchTradeType());
        dispatch(fetchCategories());
        dispatch(fetchProducts());
        dispatch(fetchFranchise());
    }, []);

    const { categories } = useSelector(
        (state) => state.categories
    );

    const { flatList } = useSelector(
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
        items: data ? (data?.dealer || data?.tender || data?.association || data?.ready_stock || data?.items || []) : [],
        country: data?.country ? data?.country : ""
    };

    const validationSchema = Yup.object().shape({
        trade_type: Yup.string().required("Trade type is required"),
        description: Yup.string().required("Description is required"),
        name: Yup.string().required("Name is required"),
        country: Yup.string().required("Country is required"),
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {

                const currentTradeTypeObj = flatList?.find((t) => t.id === values.trade_type);
                const currentTradeTypeName = currentTradeTypeObj?.name?.toLowerCase() || "";

                const isDealer = currentTradeTypeName.includes("dealer") || currentTradeTypeName.includes("franchise");
                const isTender = currentTradeTypeName.includes("tender");
                const isAssociation = currentTradeTypeName.includes("association") || currentTradeTypeName.includes("join");

                const basePayload = {
                    name: values?.name,
                    description: values?.description,
                    trade_type: { id: values.trade_type },
                    country: values?.country,
                };

                let payload = { ...basePayload };

                if (isDealer) {
                    payload.dealer = values.items.map((item) => ({
                        category: { id: item.category },
                        franchise_type: item.franchise_type,
                        image: item.image,
                        video: item.video,
                        profile: item.profile,
                        financials: item.financials
                    }));
                } else if (isTender) {
                    payload.tender = values.items.map((item) => ({
                        category: { id: item.category },
                        tender_level: item.tender_level,
                        govt_private: item.govt_private,
                        department: item.department,
                        extra_info: item.extra_info,
                        description: item.details
                    }));
                } else if (isAssociation) {
                    payload.association = values.items.map((item) => ({
                        state: item.state,
                        city: item.city,
                        company_type: item.company_type,
                        opportunity: item.opportunity,
                        company_name: item.company_name,
                        description: item.details,
                        status: item.status,
                        eoi: item.eoi,
                        mou: item.mou,
                        moa: item.moa,
                        mois: item.mois,
                        track_progress: item.track_progress,
                        association_image: item.association_image
                    }));
                } else {
                    payload.ready_stock = values.items.map((item) => ({
                        category: { id: item.category },
                        subCategory: { id: item.subCategory },
                        product: { id: item.product },
                        hsncode: item.hsncode,
                        quantity: item.quantity,
                        unit_measurement: item.unit_measurement,
                        packing_configure: item.packing_configure,
                        actual_price: item.actual_price,
                        discounted_price: item.discounted_price,
                    }));
                }

                console.log("payload", payload);

                let res
                if (id) {
                    res = await Tradeofferservice.updateTradeoffer(id, payload)
                } else {
                    res = await Tradeofferservice.addTradeoffer(payload)
                }

                if (res) {
                    resetForm()
                    navigate("/stock-management/trade-offer")
                    toast({
                        variant: "success",
                        title: "Trade Offer",
                        description: res?.data?.message,
                    });
                }
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Trade Offer Failed",
                    description: error?.response?.data?.message || "Trade Offer Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    const selectedTradeTypeObj = useMemo(() => {
        return flatList?.find((t) => t.id === formik?.values?.trade_type);
    }, [flatList, formik?.values?.trade_type]);
    const tradeTypeName = selectedTradeTypeObj?.name?.toLowerCase() || "";

    const productOptions = useMemo(() => {
        let filteredList = list;

        if (formik?.values?.category) {
            filteredList = filteredList?.filter(
                (item) => item?.category?.id === formik.values.category || item?.category === formik.values.category
            );
        }

        if (formik?.values?.subCategory) {
            filteredList = filteredList?.filter(
                (item) => item?.subcategory?.id === formik.values.subCategory || item?.subcategory === formik.values.subCategory
            );
        }

        return filteredList?.map((item) => ({
            label: item?.name,
            value: item?.id
        }));
    }, [list, formik?.values?.category, formik?.values?.subCategory]);

    const categoryOptions = useMemo(() => {
        return categories
            ?.filter((cat) => !formik?.values?.country || cat.country === formik.values.country)
            .map((cat) => ({
                label: cat.name,
                value: cat.id
            }));
    }, [categories, formik?.values?.country]);

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
        const {
            category, subCategory, product, hsncode, quantity, unit_measurement, packing_configure, actual_price, discounted_price,
            franchise_type, franchiseName, image, video, profile, financials,
            tender_level, govt_private, department, extra_info, details,
            state, city, company_type, opportunity, company_name, status, eoi, mou, moa, mois, track_progress, association_image
        } = formik.values;

        const isDealer = tradeTypeName.includes("dealer") || tradeTypeName.includes("franchise");
        const isTender = tradeTypeName.includes("tender");
        const isAssociation = tradeTypeName.includes("association") || tradeTypeName.includes("join");
        const isStocklots = !isDealer && !isTender && !isAssociation;

        if (isStocklots && (!category || !subCategory || !product || !quantity || !actual_price)) {
            toast({
                variant: "error",
                title: "Validation Error",
                description: "Please fill all required fields before adding an item.",
            });
            return;
        }

        const newItem = {
            category: category,
            categoryName: categoryOptions.find(c => c.value === category)?.label,
            subCategory: subCategory,
            subCategoryName: subCategoryOptions.find(s => s.value === subCategory)?.label,
            product: product,
            productName: productOptions.find(p => p.value === product)?.label,
            hsncode,
            quantity,
            unit_measurement,
            packing_configure,
            actual_price,
            discounted_price,
            franchise_type,
            franchiseName,
            image,
            video,
            profile,
            financials,
            tender_level,
            govt_private,
            department,
            extra_info,
            details,
            state,
            city,
            company_type,
            opportunity,
            company_name,
            status,
            eoi,
            mou,
            moa,
            mois,
            track_progress,
            association_image
        };

        formik.setFieldValue("items", [...formik.values.items, newItem]);

        const fieldsToReset = [
            "category", "subCategory", "product", "hsncode", "quantity",
            "unit_measurement", "packing_configure", "actual_price", "discounted_price",
            "franchise_type", "franchiseName", "image", "video", "profile", "financials",
            "tender_level", "govt_private", "department", "extra_info", "details",
            "state", "city", "company_type", "opportunity", "company_name", "status",
            "eoi", "mou", "moa", "mois", "track_progress", "association_image"
        ];
        fieldsToReset.forEach(field => formik.setFieldValue(field, ""));
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
                toast({
                    variant: "error",
                    title: "Trade Offer",
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
                                onChange={(value) => {
                                    formik.setFieldValue("trade_type", value);
                                    const selectedTradeType = flatList?.find((t) => t.id === value);
                                    if (selectedTradeType?.country) {
                                        formik.setFieldValue("country", selectedTradeType.country);
                                    }
                                }}
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
                                    {(tradeTypeName.includes("dealer") || tradeTypeName.includes("franchise")) && (
                                        <DealerFields formik={formik} categoryOptions={categoryOptions} />
                                    )}

                                    {tradeTypeName.includes("tender") && (
                                        <TenderFields formik={formik} categoryOptions={categoryOptions} />
                                    )}

                                    {(tradeTypeName.includes("association") || tradeTypeName.includes("join")) && (
                                        <AssociationFields formik={formik} />
                                    )}

                                    {(!tradeTypeName.includes("dealer") && !tradeTypeName.includes("franchise") && !tradeTypeName.includes("tender") && !tradeTypeName.includes("association") && !tradeTypeName.includes("join")) && (
                                        <ReadyStock formik={formik} categoryOptions={categoryOptions} subCategoryOptions={subCategoryOptions} productOptions={productOptions} />
                                    )}
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
                                    <div className="border rounded-lg overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    {(tradeTypeName.includes("dealer") || tradeTypeName.includes("franchise")) && (
                                                        <>
                                                            <TableHead>Category</TableHead>
                                                            <TableHead>Franchise Type</TableHead>
                                                            <TableHead>image</TableHead>
                                                            <TableHead>Video</TableHead>
                                                            <TableHead>Profile</TableHead>
                                                            <TableHead>Financials</TableHead>
                                                        </>
                                                    )}
                                                    {tradeTypeName.includes("tender") && (
                                                        <>
                                                            <TableHead>Category</TableHead>
                                                            <TableHead>Level</TableHead>
                                                            <TableHead>Govt/Private</TableHead>
                                                            <TableHead>Department</TableHead>
                                                            <TableHead>Extra Info</TableHead>
                                                            <TableHead>Description</TableHead>
                                                        </>
                                                    )}
                                                    {(tradeTypeName.includes("association") || tradeTypeName.includes("join")) && (
                                                        <>
                                                            <TableHead>Image</TableHead>
                                                            <TableHead>State</TableHead>
                                                            <TableHead>City</TableHead>
                                                            <TableHead>Company Name</TableHead>
                                                            <TableHead>Company Type</TableHead>
                                                            <TableHead>Opportunity</TableHead>
                                                            <TableHead>Status</TableHead>
                                                            {/* <TableHead>Description</TableHead> */}
                                                            {/* <TableHead>EOI</TableHead> */}
                                                            {/* <TableHead>MOU</TableHead> */}
                                                            {/* <TableHead>MOA</TableHead> */}
                                                            {/* <TableHead>MOIS</TableHead> */}
                                                            {/* <TableHead>Track Progress</TableHead> */}
                                                        </>
                                                    )}
                                                    {(!tradeTypeName.includes("dealer") && !tradeTypeName.includes("franchise") && !tradeTypeName.includes("tender") && !tradeTypeName.includes("association") && !tradeTypeName.includes("join")) && (
                                                        <>
                                                            <TableHead>Category</TableHead>
                                                            <TableHead>Sub Category</TableHead>
                                                            <TableHead>Product</TableHead>
                                                            <TableHead>HSN code</TableHead>
                                                            <TableHead>Quantity</TableHead>
                                                            <TableHead>Price</TableHead>
                                                        </>
                                                    )}
                                                    <TableHead className="text-right">Action</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {formik.values.items.map((item, index) => (
                                                    <TableRow key={index}>
                                                        {(tradeTypeName.includes("dealer") || tradeTypeName.includes("franchise")) && (
                                                            <>
                                                                <TableCell>{item.categoryName || item.category?.name}</TableCell>
                                                                <TableCell>{item.franchiseName || item.franchise_type}</TableCell>
                                                                <TableCell>
                                                                    {item.image ? (
                                                                        <img src={item.image} alt="Dealer" className="w-16 h-16 object-cover rounded border" />
                                                                    ) : (
                                                                        "-"
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>{item.video}</TableCell>
                                                                <TableCell>{item.profile}</TableCell>
                                                                <TableCell>{item.financials}</TableCell>
                                                            </>
                                                        )}
                                                        {tradeTypeName.includes("tender") && (
                                                            <>
                                                                <TableCell>{item.categoryName || item.category?.name}</TableCell>
                                                                <TableCell>{item.tender_level}</TableCell>
                                                                <TableCell>{item.govt_private}</TableCell>
                                                                <TableCell>{item.department}</TableCell>
                                                                <TableCell>{item.extra_info}</TableCell>
                                                                <TableCell>{item.details || item.description}</TableCell>
                                                            </>
                                                        )}
                                                        {(tradeTypeName.includes("association") || tradeTypeName.includes("join")) && (
                                                            <>
                                                                <TableCell>
                                                                    {item.association_image ? (
                                                                        <img src={item.association_image} alt="Dealer" className="w-16 h-16 object-cover rounded border" />
                                                                    ) : (
                                                                        "-"
                                                                    )}
                                                                </TableCell>
                                                                <TableCell>{item.state}</TableCell>
                                                                <TableCell>{item.city}</TableCell>
                                                                <TableCell>{item.company_name}</TableCell>
                                                                <TableCell>{item.company_type}</TableCell>
                                                                <TableCell>{item.opportunity}</TableCell>
                                                                <TableCell>{item.status}</TableCell>
                                                                {/* <TableCell>{item.details || item.description}</TableCell> */}
                                                                {/* <TableCell>{item.eoi}</TableCell> */}
                                                                {/* <TableCell>{item.mou}</TableCell> */}
                                                                {/* <TableCell>{item.moa}</TableCell> */}
                                                                {/* <TableCell>{item.mois}</TableCell> */}
                                                                {/* <TableCell>{item.track_progress}</TableCell> */}
                                                            </>
                                                        )}
                                                        {(!tradeTypeName.includes("dealer") && !tradeTypeName.includes("franchise") && !tradeTypeName.includes("tender") && !tradeTypeName.includes("association") && !tradeTypeName.includes("join")) && (
                                                            <>
                                                                <TableCell>{item.categoryName || item.category?.name}</TableCell>
                                                                <TableCell>{item.subCategoryName || item.subCategory?.name}</TableCell>
                                                                <TableCell>{item.productName || item.product?.name}</TableCell>
                                                                <TableCell>{item.hsncode}</TableCell>
                                                                <TableCell>{item.quantity} {item.unit_measurement}</TableCell>
                                                                <TableCell>{item.actual_price}</TableCell>
                                                            </>
                                                        )}
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