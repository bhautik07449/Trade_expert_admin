import React, { useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonBox from "../../../../components/common/common_box";
import { Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../store/slice/categoriesSlice";
import { useNavigate, useParams } from "react-router";
import { toast } from "../../../../components/ui/use-toast";
import ContentOverviewservice from "../../../../service/contentoverview.service";
import CountrySelection from "../../../../components/widgets/country_selection";

export default function AddContentOverview() {
    const { id } = useParams()
    const [data, setData] = useState()

    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { categories } = useSelector((state) => state.categories);

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const initialValues = {
        country_background: data ? data?.country_background : "",
        category_specific: data ? data?.category_specific : "",
        country: data ? data?.country : "",
        category: data ? data?.category?.id : "",
        global_impotance: data ? data?.global_impotance : [
            {
                content: ""
            },
        ],
    };

    const validationSchema = Yup.object({
        country_background: Yup.string().required("Country Background is required"),
        category_specific: Yup.string().required("Category Specific is required"),
        country: Yup.string().required("Country is required"),
        category: Yup.string().required("Category is required"),
        global_impotance: Yup.array().of(
            Yup.object().shape({
                content: Yup.string().required("Content is required")
            })
        ),
    });

    const formik = useFormik({
        initialValues,
        validationSchema,
        enableReinitialize: true,
        onSubmit: async (values) => {
            try {

                let res

                if (id) {
                    res = await ContentOverviewservice.updateContentOverview(id, values)
                } else {
                    res = await ContentOverviewservice.addContentOverview(values)
                }

                if (res) {
                    navigate("/website-management/section-management/content-overview")
                    toast({
                        variant: "success",
                        title: "Content Overview",
                        description: res?.data?.message,
                    });
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Content Overview Failed",
                    description: error?.response?.data?.message || "Content Overview Failed resubmit",
                });
            }
        },
    });

    const getData = async (id) => {
        try {
            const res = await ContentOverviewservice.getByid(id)
            if (res) {
                setData(res?.data?.data)
            }
        } catch (error) {
            toast({
                variant: "error",
                title: "Fetch Content Overview Failed",
                description: error?.response?.data?.message || "Something went wrong",
            });
        }
    }

    useEffect(() => {
        if (id) {
            getData(id)
        }
    }, [id])

    const addGlobalImportance = (e) => {
        e.preventDefault();

        formik.setFieldValue("global_impotance", [
            ...formik.values.global_impotance,
            {
                content: ""
            },
        ]);
    };

    const removeGlobalImportance = (index) => {
        const updated = [...formik.values.global_impotance];
        updated.splice(index, 1);
        formik.setFieldValue("global_impotance", updated);
    };

    const categoryOptions = useMemo(() => {
        return categories?.map((cat) => ({
            label: cat.name,
            value: cat.id,
        }));
    }, [categories])

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Content Overview</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 gap-8">
                        <CommonTextField
                            label="Country Background"
                            type="textarea"
                            rows={12}
                            name="country_background"
                            placeholder="Country Background"
                            value={formik.values.country_background}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.country_background && formik.errors.country_background}
                        />

                        <CommonTextField
                            label="Category Specific"
                            type="textarea"
                            rows={12}
                            name="category_specific"
                            placeholder="Category Specific"
                            value={formik.values.category_specific}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.category_specific && formik.errors.category_specific}
                        />

                        <CommonBox
                            label="Category"
                            placeholders="Select Category"
                            options={categoryOptions}
                            value={formik.values.category}
                            onChange={(value) => formik.setFieldValue("category", value)}
                            error={formik.touched.category && formik.errors.category}
                        />

                    </div>

                    <CommonButton type="button" onClick={addGlobalImportance}>
                        Add New Global Importance
                    </CommonButton>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formik.values.global_impotance?.map((item, index) => (
                            <div
                                key={index}
                                className="relative p-4 border rounded-md space-y-4"
                            >
                                <CommonTextField
                                    label="Content"
                                    type="textarea"
                                    rows={6}
                                    placeholder="Enter Global Importance"
                                    name={`global_impotance[${index}].content`}
                                    value={item.content}
                                    onChange={(e) =>
                                        formik.setFieldValue(
                                            `global_impotance[${index}].content`,
                                            e.target.value
                                        )
                                    }
                                    onBlur={formik.handleBlur}
                                    error={
                                        formik.touched?.global_impotance?.[index]?.content &&
                                        formik.errors?.global_impotance?.[index]?.content
                                    }
                                />

                                {formik.values.global_impotance.length > 1 && (
                                    <CommonButton
                                        type="button"
                                        onClick={() => removeGlobalImportance(index)}
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
    );
};