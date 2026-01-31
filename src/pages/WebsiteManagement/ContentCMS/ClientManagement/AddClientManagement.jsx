import CommonBox from "../../../../components/common/common_box";
import BackPath from "../../../../components/common/BackPath";
import ImageUploadField from "../../../../components/common/ImageUploadField";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function AddClientManagement() {
    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">Add Client</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="First Name"
                                placeholder="First Name"
                            />
                            <CommonTextField
                                label="Last Name"
                                placeholder="Last Name"
                            />
                            <CommonTextField
                                label="Email"
                                placeholder="Email"
                            />
                        </div>
                        <div className="space-y-5">
                            <CommonTextField
                                label="Phone No."
                                placeholder="Phone No."
                            />
                            <ImageUploadField label="Image" />
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