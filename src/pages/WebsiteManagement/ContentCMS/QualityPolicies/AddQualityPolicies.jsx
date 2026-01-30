import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import CommonBox from "../../../../components/common/common_box";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import CommonButton from "../../../../components/widgets/common_button";
import { useState } from "react";
import ImageUploadField from "../../../../components/common/ImageUploadField";

export default function AddQualityPolicies() {
    const [category, setCategory] = useState("");

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">Add Quality Policy</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonBox
                                label="Category"
                                placeholders="Select Category"
                                options={[
                                    { label: "active", value: "active" },
                                    { label: "deactive", value: "deactive" },
                                ]}
                                value={category}
                                onChange={setCategory}
                            />
                            <CommonTextField
                                label="Name"
                            />
                            <ImageUploadField label="QualityPolicy" />
                            <CommonTextField
                                label="Description"
                                type="textarea"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-5 border-t">
                        <CommonButton type="button" variant="outline">
                            Cancel
                        </CommonButton>

                        <CommonButton type="submit">
                            Add
                        </CommonButton>
                    </div>
                </form>
            </Card>
        </div>
    )
}