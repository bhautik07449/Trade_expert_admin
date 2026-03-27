import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CommonButton from "../../../components/widgets/common_button";
import { CommonTextField } from "../../../components/widgets/common_textField";
import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";
import CommonBox from "../../../components/common/common_box";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/slice/categoriesSlice";
import { useNavigate, useParams } from "react-router";
import DMRservice from "../../../service/dmr.service";
import { toast } from "../../../components/ui/use-toast";

const AddDMR = () => {
    const { id } = useParams()
    const [data, setData] = useState()
    console.log("data", data);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const initialValues = {
        category: data ? data?.category?.id : "",
        subCategory: data ? data?.subcategory?.id : "",
        name: data ? data?.name : "",
        market: data ? data?.market : [
            {
                country: "",
                quality: "",
                rate: "",
                packing: "",
                delivery: "",
                categoryType: "",
                noOfPacking: "",
            },
        ],
    };

    const validationSchema = Yup.object({
        category: Yup.string().required("Category is required"),
        subCategory: Yup.string().required("Sub Category is required"),
        name: Yup.string().required("Name is required"),

        market: Yup.array().of(
            Yup.object().shape({
                country: Yup.string().required("Country is required"),
                quality: Yup.string().required("Quality is required"),
                rate: Yup.number()
                    .typeError("Rate must be number")
                    .required("Rate is required"),
                packing: Yup.string().required("Packing is required"),
                delivery: Yup.string().required("Delivery is required"),
                categoryType: Yup.string().required("Category Type is required"),
                noOfPacking: Yup.number()
                    .typeError("Must be number")
                    .required("No Of Packing is required"),
            })
        ),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            console.log("Form Data:", values);

            try {

                let res

                if (id) {
                    res = await DMRservice.updateDMR(id, values)
                } else {
                    res = await DMRservice.addDMR(values)
                }

                if (res) {
                    navigate("/stock-management/dmr-management")
                    toast({
                        variant: "success",
                        title: "DMR",
                        description: res?.data?.message,
                    });
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "DMR Failed",
                    description: "DMR Failed resubmit",
                });
            }
        },
    });

    const getData = async (id) => {
        try {
            const res = await DMRservice.getByid(id)
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

    const addMarket = (e) => {
        e.preventDefault();

        formik.setFieldValue("market", [
            ...formik.values.market,
            {
                country: "",
                quality: "",
                rate: "",
                packing: "",
                delivery: "",
                categoryType: "",
                noOfPacking: "",
            },
        ]);
    };

    const removeMarket = (index) => {
        const updated = [...formik.values.market];
        updated.splice(index, 1);
        formik.setFieldValue("market", updated);
    };

    const categoryOptions = useMemo(() => {
        return categories?.map((cat) => ({
            label: cat.name,
            value: cat.id,
        }));
    }, [categories]);

    const selectedCategory = categories?.find(
        (cat) => cat.id === formik.values.category
    );

    const subCategoryOptions = useMemo(() => {
        if (!selectedCategory) return [];

        return (
            selectedCategory.children?.map((sub) => ({
                label: sub.name,
                value: sub.id,
            })) || []
        );
    }, [selectedCategory]);

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">{id ? "Edit" : "Add"} DMR</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <CommonBox
                            label="Parent Category"
                            placeholders="Select Category"
                            options={categoryOptions}
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
                            value={formik.values.subCategory}
                            onChange={(value) =>
                                formik.setFieldValue("subCategory", value)
                            }
                            error={
                                formik.touched.subCategory && formik.errors.subCategory
                            }
                        />

                        <CommonTextField
                            label="Name"
                            name="name"
                            placeholder="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && formik.errors.name}
                        />
                    </div>

                    <CommonButton type="button" onClick={addMarket}>
                        Add New Market Details
                    </CommonButton>

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formik.values.market?.map((item, index) => (
                            <div
                                key={index}
                                className="relative p-4 border rounded-md space-y-4"
                            >
                                <CommonTextField
                                    label="Country"
                                    name={`market[${index}].country`}
                                    value={item.country}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `market[${index}].country`,
                                            e.target.value
                                        )
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched?.market?.[index]?.country &&
                                        formik.errors?.market?.[index]?.country
                                    }
                                />

                                <CommonTextField
                                    label="Quality"
                                    name={`market[${index}].quality`}
                                    value={item.quality}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `market[${index}].quality`,
                                            e.target.value
                                        )
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched?.market?.[index]?.quality &&
                                        formik.errors?.market?.[index]?.quality
                                    }
                                />

                                <CommonTextField
                                    label="Rate"
                                    name={`market[${index}].rate`}
                                    value={item.rate}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `market[${index}].rate`,
                                            e.target.value
                                        )
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched?.market?.[index]?.rate &&
                                        formik.errors?.market?.[index]?.rate
                                    }
                                />

                                <CommonTextField
                                    label="Packing"
                                    name={`market[${index}].packing`}
                                    value={item.packing}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `market[${index}].packing`,
                                            e.target.value
                                        )
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched?.market?.[index]?.packing &&
                                        formik.errors?.market?.[index]?.packing
                                    }
                                />

                                <CommonTextField
                                    label="Delivery"
                                    name={`market[${index}].delivery`}
                                    value={item.delivery}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `market[${index}].delivery`,
                                            e.target.value
                                        )
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched?.market?.[index]?.delivery &&
                                        formik.errors?.market?.[index]?.delivery
                                    }
                                />

                                <CommonTextField
                                    label="Category Type"
                                    name={`market[${index}].categoryType`}
                                    value={item.categoryType}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `market[${index}].categoryType`,
                                            e.target.value
                                        )
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched?.market?.[index]?.categoryType &&
                                        formik.errors?.market?.[index]?.categoryType
                                    }
                                />

                                <CommonTextField
                                    label="No Of Packing"
                                    name={`market[${index}].noOfPacking`}
                                    value={item.noOfPacking}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `market[${index}].noOfPacking`,
                                            e.target.value
                                        )
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched?.market?.[index]?.noOfPacking &&
                                        formik.errors?.market?.[index]?.noOfPacking
                                    }
                                />

                                {formik.values.market.length > 1 && (
                                    <CommonButton
                                        type="button"
                                        onClick={() => removeMarket(index)}
                                    >
                                        <Trash2 size={16} />
                                    </CommonButton>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton type="button" variant="outline">
                            Cancel
                        </CommonButton>

                        <CommonButton type="submit">
                            {id ? "Edit" : "Add"} DMR
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddDMR