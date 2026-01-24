import { Card } from "../../../../components/ui/card";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function CoverLetterLc() {
    return (
        <Card>
            <div className="max-w-[800px] mx-auto p-4">
                Covering Letter For Post Shipment Under LC
            </div>
        </Card>
    );
}

function Field({ label, type }) {
    return (
        <div className="grid grid-cols-[150px_1fr] items-center gap-2">
            <span>{label}:</span>
            <CommonTextField
                type={type || 'text'}
            />
        </div>
    );
}

function TextArea({ label }) {
    return (
        <div className="grid grid-cols-[150px_1fr] gap-2">
            <span>{label}:</span>
            <CommonTextField
                type='textarea'
            />
        </div>
    );
}