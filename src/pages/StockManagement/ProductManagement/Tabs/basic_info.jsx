import { useState } from "react";
import CommonBox from "../../../../components/common/common_box";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import CommonButton from "../../../../components/widgets/common_button";

export default function BasicInfo() {
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
    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [measure, setMeasure] = useState("");

    return (
        <form className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <CommonTextField
                    label="Name"
                    placeholder="Name"
                />
                <div className="grid grid-cols-2 gap-4">
                    <CommonTextField
                        label="Price (in $ only)"
                        placeholder="Price"
                    />

                    <CommonBox
                        label="Measure"
                        placeholders="Select Measure"
                        options={Measure}
                        value={measure}
                        onChange={setMeasure}
                    />
                </div>
                <CommonTextField
                    label="Teriff"
                    placeholder="Teriff"
                />
                <CommonTextField
                    label="Slug (URL ADDRESS)"
                    placeholder="Slug"
                />
                <CommonBox
                    label="Category"
                    placeholders="Select Category"
                    options={Category}
                    value={category}
                    onChange={setCategory}
                />
                <CommonBox
                    label="Sub Category"
                    placeholders="Select Sub Category"
                    options={subCategories}
                    value={subCategory}
                    onChange={setSubCategory}
                />
            </div>
            <div className="flex justify-end gap-3 pt-5 border-t">
                <CommonButton type="button" variant="outline">
                    Cancel
                </CommonButton>

                <CommonButton type="submit">
                    Save
                </CommonButton>
            </div>
        </form>
    );
}