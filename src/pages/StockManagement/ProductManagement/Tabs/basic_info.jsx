import { useMemo } from "react";
import CommonBox from "../../../../components/common/common_box";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Label } from "../../../../components/ui/label";
import CountrySelection from "../../../../components/widgets/country_selection";

export default function BasicInfo({ formik, categories, flatList }) {

    const categoryOptions = useMemo(() => {
        // Filter categories by selected country if a country is chosen
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

    const massureOptions = useMemo(() => {
        return flatList?.map((cat) => ({
            label: cat.name,
            value: cat.id
        }));
    }, [flatList])

    return (
        <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CommonTextField
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && formik.errors.name}
                />
                <div className="grid grid-cols-2 gap-4">
                    <CommonTextField
                        label="Price (in $ only)"
                        placeholder="Price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && formik.errors.price}
                    />

                    <CommonBox
                        label="Measure"
                        placeholders="Select Measure"
                        options={massureOptions}
                        name="measure"
                        value={formik.values.measure}
                        onChange={(value) => formik.setFieldValue("measure", value)}
                        error={formik.touched.measure && formik.errors.measure}
                    />
                </div>
                <CommonTextField
                    label="Teriff"
                    placeholder="Teriff"
                    name="teriff"
                    value={formik.values.teriff}
                    onChange={formik.handleChange}
                    error={formik.touched.teriff && formik.errors.teriff}
                />
                <CommonTextField
                    label="Slug (URL ADDRESS)"
                    placeholder="Slug"
                    name="slug"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                    error={formik.touched.slug && formik.errors.slug}
                />
                <CountrySelection formik={formik} />
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
                    name="subCategory"
                    value={formik.values.subCategory}
                    onChange={(value) => formik.setFieldValue("subCategory", value)}
                    error={formik.touched.subCategory && formik.errors.subCategory}
                />

                <div className="mt-4">
                    <Label className="mb-2 block">Season</Label>
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="season-all"
                                checked={formik.values.season === 'All'}
                                onCheckedChange={() => formik.setFieldValue("season", "All")}
                            />
                            <Label htmlFor="season-all">New Arrival</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="season-current"
                                checked={formik.values.season === 'Current'}
                                onCheckedChange={() => formik.setFieldValue("season", "Current")}
                            />
                            <Label htmlFor="season-current">Trending</Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="season-upcoming"
                                checked={formik.values.season === 'Upcoming'}
                                onCheckedChange={() => formik.setFieldValue("season", "Upcoming")}
                            />
                            <Label htmlFor="season-upcoming">Featured</Label>
                        </div>
                    </div>
                </div>

                <CommonBox
                    label="service type"
                    placeholders="service type"
                    options={[
                        { label: "Standalone", value: "Standalone" },
                        { label: "Supervised", value: "Supervised" },
                        { label: "Sectored", value: "Sectored" },
                        { label: "Sovereign", value: "Sovereign" }
                    ]}
                    name="status"
                    value={formik.values.status}
                    onChange={(value) => formik.setFieldValue("status", value)}
                    error={formik.touched.status && formik.errors.status}
                />
            </div>
        </div>
    );
}