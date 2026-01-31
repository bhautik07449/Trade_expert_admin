import CommonBox from "../../../../components/common/common_box";
import BackPath from "../../../../components/common/BackPath";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useState } from "react";

export default function AddTestimonialManagement() {
    const [client, setClient] = useState("");

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">Add Testimonial</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonBox
                                placeholders="Select Client"
                                label="Client"
                                options={[
                                    { label: "active", value: "active" },
                                    { label: "deactive", value: "deactive" },
                                ]}
                                value={client}
                                onChange={setClient}
                            />

                            <CommonTextField
                                label="Review"
                                placeholder="Review"
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