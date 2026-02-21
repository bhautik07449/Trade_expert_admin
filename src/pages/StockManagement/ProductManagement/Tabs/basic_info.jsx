import { useState } from "react";
import CommonBox from "../../../../components/common/common_box";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import CommonButton from "../../../../components/widgets/common_button";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Label } from "../../../../components/ui/label";

export default function BasicInfo({ formik }) {
    const Measure = [
        { label: "Kg", value: "Kg" },
        { label: "Gram", value: "Gram" },
        { label: "Litre", value: "Litre" },
        { label: "Millilitre", value: "Millilitre" },
    ]

    const Category = [
        { label: "Electronics", value: "Electronics" },
        { label: "Apparel", value: "Apparel" },
        { label: "Home & Kitchen", value: "Home & Kitchen" },
        { label: "Books", value: "Books" },
    ]

    const subCategories = [
        { label: "Mobile Phones", value: "Mobile Phones" },
        { label: "Laptops", value: "Laptops" },
        { label: "Fiction", value: "Fiction" },
        { label: "Non-Fiction", value: "Non-Fiction" },
    ]

    return (
        <form className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CommonTextField
                    label="Name"
                    placeholder="Name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                />
                <div className="grid grid-cols-2 gap-4">
                    <CommonTextField
                        label="Price (in $ only)"
                        placeholder="Price"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                    />

                    <CommonBox
                        label="Measure"
                        placeholders="Select Measure"
                        options={Measure}
                        name="measure"
                        value={formik.values.measure}
                        onChange={(value) => formik.setFieldValue("measure", value)}
                    />
                </div>
                <CommonTextField
                    label="Teriff"
                    placeholder="Teriff"
                    name="teriff"
                    value={formik.values.teriff}
                    onChange={formik.handleChange}
                />
                <CommonTextField
                    label="Slug (URL ADDRESS)"
                    placeholder="Slug"
                    name="slug"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                />
                <CommonBox
                    label="Category"
                    placeholders="Select Category"
                    options={Category}
                    name="category"
                    value={formik.values.category}
                    onChange={(value) => formik.setFieldValue("category", value)}
                />
                <CommonBox
                    label="Sub Category"
                    placeholders="Select Sub Category"
                    options={subCategories}
                    name="subCategory"
                    value={formik.values.subCategory}
                    onChange={(value) => formik.setFieldValue("subCategory", value)}
                />

                <div className="flex justify-between">
                    <div className="flex items-center gap-2 mt-6">
                        <Checkbox label="new-arrival-checkbox" checked={formik.values.newArrival} onChange={(e) => formik.setFieldValue("newArrival", e.target.checked)} />
                        <Label htmlFor="new-arrival-checkbox">New Arrival</Label>
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                        <Checkbox label="trending-checkbox" checked={formik.values.trending} onChange={(e) => formik.setFieldValue("trending", e.target.checked)} />
                        <Label htmlFor="trending-checkbox">Trending</Label>
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                        <Checkbox label="featured-checkbox" checked={formik.values.featured} onChange={(e) => formik.setFieldValue("featured", e.target.checked)} />
                        <Label htmlFor="featured-checkbox">Featured</Label>
                    </div>
                </div>
            </div>
        </form>
    );
}