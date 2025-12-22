import React, { useState } from "react";
import CommonButton from "../../../components/widgets/common_button";
import { CommonTextField } from "../../../components/widgets/common_textField";
import BackPath from "../../../components/common/BackPath";
import { Card } from "../../../components/ui/card";
import CommonBox from "../../../components/common/common_box";
import { Trash2 } from "lucide-react";

const AddDMR = () => {
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
    const [markets, setMarkets] = useState([{
        country: "",
        quality: "",
        rate: "",
        packing: "",
        delivery: "",
        categoryType: "",
        noOfPacking: "",
    }]);

    const addMarket = (e) => {
        e?.preventDefault();

        setMarkets([
            ...markets,
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
        setMarkets(markets.filter((_, i) => i !== index));
    };

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">Add DMR</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <CommonBox
                            label="Parent Category"
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

                        <CommonTextField
                            label="Name"
                            placeholder="Name"
                        />
                    </div>

                    <CommonButton
                        onClick={addMarket}
                    >
                        Add New Market Details
                    </CommonButton>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {markets?.map((item, index) => (
                            <div key={index} className="relative p-4 border rounded-md space-y-4">

                                <CommonTextField
                                    label="Country"
                                    placeholder="Country"
                                />
                                <CommonTextField
                                    label="Quality"
                                    placeholder="Quality"
                                />
                                <CommonTextField
                                    label="Rate"
                                    placeholder="Rate"
                                />
                                <CommonTextField
                                    label="Packing"
                                    placeholder="Packing"
                                />
                                <CommonTextField
                                    label="Delivery"
                                    placeholder="Delivery"
                                />
                                <CommonTextField
                                    label="Category Type"
                                    placeholder="Category Type"
                                />
                                <CommonTextField
                                    label="No Of Packing"
                                    placeholder="No Of Packing"
                                />
                                {markets.length > 1 && (
                                    <CommonButton
                                        type="button"
                                        onClick={() => removeMarket(index)}
                                        className="text-background text-sm"
                                    >
                                        <Trash2 />
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
                            Add DMR
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default AddDMR;