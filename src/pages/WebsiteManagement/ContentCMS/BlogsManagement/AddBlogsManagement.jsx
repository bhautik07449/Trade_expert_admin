import CommonBox from "../../../../components/common/common_box";
import BackPath from "../../../../components/common/BackPath";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useState } from "react";

export default function AddBlogsManagement() {
    const [category, setCategory] = useState("");

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">Add Blog</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="Expected Post Date"
                                placeholder="Expected Post Date"
                            />
                            <CommonBox
                                placeholders="Select Blog Category"
                                label="Blog Category"
                                options={[
                                    { label: "active", value: "active" },
                                    { label: "deactive", value: "deactive" },
                                ]}
                                value={category}
                                onChange={setCategory}
                            />
                            <CommonTextField
                                label="Name"
                                placeholder="Name"
                            />
                            <CommonTextField
                                label="Blog Title"
                                placeholder="Blog Title"
                            />
                            <CommonTextField
                                label="Blog Detail"
                                placeholder="Blog Detail"
                                type="textarea"
                                rows={6}
                            />
                        </div>
                        <div className="space-y-5">
                            <ImageUploadField label="Slider" />
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