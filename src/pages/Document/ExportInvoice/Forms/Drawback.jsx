import { Card } from "../../../../components/ui/card";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function Drawback() {
    return (
        <Card>
            <div className="max-w-[800px] mx-auto p-4">
                <h1 className="text-center text-lg font-bold mb-4">Drawback</h1>
                <div className="grid grid-cols-1 gap-4">
                    <Field label="Shipping Bill Number" type="text" />
                    <Field label="Date" type="date" />

                    <div className="flex justify-end gap-4 mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded flex items-center">
                            Create PDF
                        </button>
                        <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
}

function Field({ label, type }) {
    return (
        <div className="grid grid-cols-[200px_1fr] items-center gap-2">
            <span className="font-medium">{label}:</span>
            <CommonTextField
                type={type || 'text'}
                className="border border-gray-300 rounded px-2 py-1 w-full"
            />
        </div>
    );
}
