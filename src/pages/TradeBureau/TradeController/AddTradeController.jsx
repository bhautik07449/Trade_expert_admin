import { useNavigate, useParams } from "react-router";
import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";
import CommonButton from "../../../components/widgets/common_button";
import { useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "../../../components/ui/use-toast";
import TradeBureauService from "../../../service/tradebureau.service";
import PresencesService from "../../../service/presences.service";
import MultiSelectBox from "../../../components/common/MultiSelectBox";
import { Label } from "../../../components/ui/label";
import { Textarea } from "../../../components/ui/textarea";
import { CommonTextField } from "../../../components/widgets/common_textField";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs";
import { Trash2, Plus } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../store/slice/categoriesSlice";
import CommonBox from "../../../components/common/common_box";

export default function AddTradeController() {
    const { id } = useParams()
    const [data, setData] = useState()
    const [countryOptions, setCountryOptions] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories());
    }, []);

    useEffect(() => {
        const getCountries = async () => {
            try {
                const res = await PresencesService.getCountry();
                if (res?.data?.objects?.countries?.geometries) {
                    const countries = res.data.objects.countries.geometries
                        .map((item) => ({
                            label: item?.properties?.name,
                            value: item?.properties?.name,
                        }))
                        .filter((item) => item.label)
                        .sort((a, b) => a.label.localeCompare(b.label));
                    setCountryOptions(countries);
                }
            } catch (error) {
                console.log(error, "error fetching countries");
            }
        };
        getCountries()
    }, [])

    const parseArrayData = (fieldData) => {
        const defaultRow = [{ no: "", country: "", status: "", description: "" }];
        if (!fieldData) return defaultRow;

        let parsed = fieldData;
        if (typeof fieldData === 'string') {
            try {
                parsed = JSON.parse(fieldData);
            } catch (e) {
                return defaultRow;
            }
        }

        if (Array.isArray(parsed) && parsed.length > 0) {
            return parsed;
        }
        return defaultRow;
    };

    const initialValues = {
        category: data ? data?.category?.id : "",
        name: data ? data?.name : "",
        description: data ? data?.description : "",
        available_countries: data?.available_countries ? data.available_countries.map(c => c.country_name) : [],
        import_data: parseArrayData(data?.import_data),
        export_data: parseArrayData(data?.export_data),
    };

    const validationSchema = Yup.object().shape({
        category: Yup.number().required("Category is required"),
        name: Yup.string().required("Name is required"),
        description: Yup.string().required("Description is required"),
        available_countries: Yup.array().min(1, "At least one country is required"),
    });

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        validationSchema,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            try {
                const payload = {
                    ...values,
                    available_countries: values.available_countries.map(c => ({ country_name: c }))
                };

                let res
                if (id) {
                    res = await TradeBureauService.updateTradeController(id, payload)
                } else {
                    res = await TradeBureauService.addTradeController(payload);
                }
                resetForm()
                navigate("/trade_bureau/trade_controller")
                toast({
                    variant: "success",
                    title: "Trade Controller",
                    description: res?.data?.message || (id ? "Updated successfully" : "Added successfully"),
                });
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Trade Controller Error",
                    description: error?.response?.data?.message || "Failed to submit",
                });
            } finally {
                setSubmitting(false);
            }
        }
    });

    const { categories } = useSelector((state) => state.categories);

    const categoryOptions = useMemo(() => {
        return categories?.map(cat => ({
            label: cat.name,
            value: cat.id,
        }));
    }, [categories, formik.values.country]);

    useEffect(() => {
        const getData = async (id) => {
            try {
                const res = await TradeBureauService.getTradeControllerByid(id);
                if (res) {
                    const fetchedData = res?.data?.data || res?.data
                    setData(fetchedData)
                }
            } catch (error) {
                toast({
                    variant: "error",
                    title: "Get Error",
                    description: error?.response?.data?.message || "Something went wrong",
                });
            }
        }
        if (id) { getData(id) }
    }, [id])

    const renderDataArray = (arrayName) => {
        const items = formik.values[arrayName];
        return (
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start border p-4 rounded-md relative pt-8">
                        <div className="absolute top-2 right-2">
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-destructive h-8 w-8"
                                onClick={() => {
                                    const newArray = [...items];
                                    newArray.splice(index, 1);
                                    formik.setFieldValue(arrayName, newArray);
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="lg:col-span-1">
                            <CommonTextField
                                label="No"
                                placeholder="No"
                                name={`${arrayName}[${index}].no`}
                                value={item.no}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <CommonBox
                                options={countryOptions}
                                label="Country"
                                placeholder="Country"
                                name={`${arrayName}[${index}].country`}
                                value={item.country}
                                onChange={(value) => formik.setFieldValue(`${arrayName}[${index}].country`, value)}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="lg:col-span-1">
                            <CommonTextField
                                label="Status"
                                placeholder="Status"
                                name={`${arrayName}[${index}].status`}
                                value={item.status}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        <div className="lg:col-span-2">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="Description"
                                name={`${arrayName}[${index}].description`}
                                value={item.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                rows={2}
                                className="mt-2"
                            />
                        </div>
                    </div>
                ))}
                <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={() => {
                        formik.setFieldValue(arrayName, [...items, { no: "", country: "", status: "", description: "" }])
                    }}
                >
                    <Plus className="w-4 h-4" /> Add Item
                </Button>
            </div>
        );
    }

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">{id ? "Edit" : "Add"} Trade Controller</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6" onSubmit={formik.handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <div className="grid gap-2">
                                <CommonTextField
                                    label="Name"
                                    placeholder="Enter Name"
                                    name="name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && formik.errors.name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <CommonBox
                                    label="Category"
                                    placeholders="Select Category"
                                    name="category"
                                    options={categoryOptions}
                                    value={formik.values.category}
                                    onChange={(value) => formik.setFieldValue("category", value)}
                                    error={formik.touched.category && formik.errors.category}
                                />
                            </div>
                        </div>

                        <div className="space-y-5">
                            <MultiSelectBox
                                label="Available Countries"
                                placeholders="Select options"
                                options={countryOptions}
                                name="available_countries"
                                value={formik.values.available_countries}
                                onChange={(value) => formik.setFieldValue("available_countries", value)}
                                error={formik.touched.available_countries && formik.errors.available_countries}
                            />

                            <div className="grid gap-2">
                                <CommonTextField
                                    label="Description"
                                    placeholder="Enter Description"
                                    name="description"
                                    type="textarea"
                                    value={formik.values.description}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.description && formik.errors.description}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6">
                        <Tabs defaultValue="import_data" className="w-full">
                            <TabsList className="mb-4">
                                <TabsTrigger value="import_data">Import Data</TabsTrigger>
                                <TabsTrigger value="export_data">Export Data</TabsTrigger>
                            </TabsList>
                            <TabsContent value="import_data">
                                {renderDataArray('import_data')}
                            </TabsContent>
                            <TabsContent value="export_data">
                                {renderDataArray('export_data')}
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton
                            type="button"
                            variant="outline"
                            onClick={() => navigate("/trade_bureau/trade_controller")}
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