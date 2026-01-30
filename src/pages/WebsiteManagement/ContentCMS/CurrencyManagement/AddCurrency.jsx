import { Card } from "../../../../components/ui/card";
import BackPath from "../../../../components/common/BackPath";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import CommonButton from "../../../../components/widgets/common_button";
import ImageUploadField from "../../../../components/common/ImageUploadField";

export default function AddCurrency() {
    return (
        <div className="grid gap-6">
            <div className="grid gap-4">
                <BackPath />
                <h3 className="h5-bold">Add Currency</h3>
            </div>

            <Card className="p-6">
                <form className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-5">
                            <CommonTextField
                                label="Name"
                                placeholder="Name"
                            />
                            <CommonTextField
                                label="Rate"
                                placeholder="Rate"
                            />
                            <CommonTextField
                                label="Symbol"
                                placeholder="Symbol"
                            />
                        </div>
                        <div className="space-y-5">
                            <CommonTextField
                                label="Description"
                                placeholder="Description"
                                type="textarea"
                                rows={6}
                            />
                            <ImageUploadField />
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
    );
};