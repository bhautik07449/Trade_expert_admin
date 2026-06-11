import { useNavigate, useParams } from "react-router";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../../components/ui/use-toast";
import CountrySelection from "../../../../components/widgets/country_selection";
import IRProjectservice from "../../../../service/irproject.service";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../../store/slice/categoriesSlice";
import CommonBox from "../../../../components/common/common_box";

export default function AddProject() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [list, setList] = useState()

    const dispatch = useDispatch();

    const { categories } = useSelector(
        (state) => state.categories
    );

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const initialValues = {
        title: list ? list?.title : "",
        description: list ? list?.description : "",
        image: list ? list?.image : "",
        category: list ? list?.category?.id : "",
        subcategory: list ? list?.subcategory?.id : "",
        country: list ? list?.country : "",
        specification: list?.specification || []
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        category: Yup.string().required("Category is required"),
        subcategory: Yup.string().required("Subcategory is required"),
        country: Yup.string().required("Country is required")
    });

    const handleAddSpecification = () => {
        formik.setFieldValue("specification", [
            ...formik.values.specification,
            { key: "", value: "" }
        ]);
    };

    const handleRemoveSpecification = (index) => {
        const newSpecs = formik.values.specification.filter((_, i) => i !== index);
        formik.setFieldValue("specification", newSpecs);
    };

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {

                let res
                if (id) {
                    res = await IRProjectservice.updateIRProject(id, values)
                } else {
                    res = await IRProjectservice.addIRProject(values);
                }
                resetForm()
                navigate("/website-management/content/ir_project")
                toast({
                    variant: "success",
                    title: "Project",
                    description: res?.data?.message,
                });
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Project Failed",
                    description: error?.response?.data?.message || "Project Failed resubmit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await IRProjectservice.getByid(id);
                if (res) {
                    const data = res?.data?.data
                    setList(data)
                }

            } catch (error) {
                toast({
                    variant: "error",
                    title: "Project Details Error",
                    description: error?.response?.data?.message || "Something went wrong",
                });
            }
        }

        if (id) {
            getData(id)
        }
    }, [id])

    const categoryOptions = useMemo(() => {
        return categories
            ?.filter(cat => !formik.values.country || cat.country === formik.values.country)
            .map(cat => ({
                label: cat.name,
                value: cat.id,
            }));
    }, [categories, formik.values.country]);

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

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Project</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="Title"
                                placeholder="Title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && formik.errors.title}
                            />

                            <CommonTextField
                                label="Description"
                                placeholder="Description"
                                name="description"
                                type="textarea"
                                rows={4}
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.description && formik.errors.description}
                            />

                            <CountrySelection formik={formik} />

                            <div className="grid grid-cols-2 gap-4">
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
                                    disabled={!formik?.values?.country}
                                    error={formik.touched.category && formik.errors.category}
                                />
                                <CommonBox
                                    label="Sub Category"
                                    placeholders="Select Sub Category"
                                    options={subCategoryOptions}
                                    name="subcategory"
                                    value={formik.values.subcategory}
                                    onChange={(value) => formik.setFieldValue("subcategory", value)}
                                    disabled={!formik?.values?.category}
                                    error={formik.touched.subcategory && formik.errors.subcategory}
                                />
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium">Specifications</label>
                                    <Button type="button" variant="outline" size="sm" onClick={handleAddSpecification}>
                                        <Plus className="w-4 h-4 mr-2" /> Add
                                    </Button>
                                </div>
                                {formik.values.specification.map((spec, index) => (
                                    <div key={index} className="flex gap-2 items-start">
                                        <div className="flex-1">
                                            <CommonTextField
                                                placeholder="Key (e.g. Field)"
                                                name={`specification[${index}].key`}
                                                value={formik.values.specification[index]?.key}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <CommonTextField
                                                placeholder="Value (e.g. Textile)"
                                                name={`specification[${index}].value`}
                                                value={formik.values.specification[index]?.value}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => handleRemoveSpecification(index)}
                                            className="mt-1 flex-shrink-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-5">
                            <ImageUploadField
                                value={formik.values.image}
                                onImageUpload={(url) => {
                                    formik.setFieldValue("image", url);
                                }}
                            />
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