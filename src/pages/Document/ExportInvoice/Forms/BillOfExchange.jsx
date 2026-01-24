import { Card } from "../../../../components/ui/card";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function BillOfExchange() {
    return (
        <Card>
            <div className="mx-auto p-4">
                <h1 className="text-center text-lg font-bold mb-4">Bill Of Exchange (Collection)</h1>
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