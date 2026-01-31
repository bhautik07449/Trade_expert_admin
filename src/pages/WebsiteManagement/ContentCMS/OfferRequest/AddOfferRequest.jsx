import BackPath from "../../../../components/common/BackPath";
import CommonBox from "../../../../components/common/common_box";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { useState } from "react";

export default function AddOfferRequest() {
    const [trade, setTrade] = useState("");

    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">Add Trade Offer Request</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonBox
                                placeholders="Select Trade Offer"
                                label="Trade Offer"
                                options={[
                                    { label: "active", value: "active" },
                                    { label: "deactive", value: "deactive" },
                                ]}
                                value={trade}
                                onChange={setTrade}
                            />
                            <CommonTextField
                                label="Name"
                                placeholder="Name"
                            />
                            <CommonTextField
                                label="Email"
                                placeholder="Email"
                            />
                            <CommonTextField
                                label="Phone"
                                placeholder="Phone"
                            />
                            <CommonTextField
                                label="Message"
                                placeholder="Message"
                                type="textarea"
                                rows={6}
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