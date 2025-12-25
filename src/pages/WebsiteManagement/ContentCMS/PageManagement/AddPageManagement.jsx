import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import CommonButton from "../../../../components/widgets/common_button";
import CommonBox from "../../../../components/common/common_box";
import { useState } from "react";

export default function AddPageManagement() {
    const [status, setStatus] = useState()

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">Add Pages</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="Page Name"
                                placeholder="Page Name"
                            />
                            <CommonTextField
                                label="Page Title"
                                placeholder="Page Title"
                            />
                            <CommonTextField
                                label="Page Url"
                                placeholder="Page Url"
                            />
                            <CommonTextField
                                label="Page Meta Title"
                                placeholder="Page Meta Title"
                            />
                            <CommonTextField
                                label="Meta Keyword"
                                placeholder="Meta Keyword"
                            />
                            <CommonTextField
                                label="Meta Description"
                                placeholder="Meta Description"
                            />
                        </div>
                        <div className="space-y-5">
                            <div>Here add ckeditor</div>
                            <CommonBox
                                placeholders="Select Status of Page"
                                options={[
                                    { label: "active", value: "active" },
                                    { label: "deactive", value: "deactive" },
                                ]}
                                value={status}
                                onChange={setStatus}
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