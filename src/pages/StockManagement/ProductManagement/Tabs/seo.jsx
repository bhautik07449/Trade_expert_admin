import CommonButton from "../../../../components/widgets/common_button";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function SEO() {
    return (
        <form className="grid gap-6">
            <div className="grid grid-cols-1 gap-4 max-w-xl">
                <CommonTextField
                    label="Page Title"
                    placeholder="Enter Page Title"
                />

                <CommonTextField
                    type="textarea"
                    label="Meta Keywords"
                    rows={2}
                    placeholder="Enter meta keywords (comma separated)"
                />

                <CommonTextField
                    type="textarea"
                    label="Meta Description"
                    placeholder="Enter meta description"
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