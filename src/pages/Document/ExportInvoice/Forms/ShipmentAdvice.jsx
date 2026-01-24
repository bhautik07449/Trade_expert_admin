import { Card } from "../../../../components/ui/card";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function ShipmentAdvice() {
    return (
        <Card>
            <div className="max-w-[800px] mx-auto p-4">
                <h1 className="text-center text-lg font-bold mb-4">Shipment Advice</h1>

                <Field label="Date" type="date" />

                <div className="col-span-2">
                    <h2 className="font-semibold">To:</h2>
                    <TextArea label="Recipient Details" />
                </div>

                <div className="col-span-2">
                    <h2 className="font-semibold">Dear Sir,</h2>
                    <TextArea label="Custom Text" />
                </div>

                <div className="col-span-2">
                    <h2 className="font-semibold text-center">Particulars of Shipment</h2>
                </div>
                <Field label="B/L Number" type="text" />
                <Field label="Date" type="date" />
                <Field label="Name of the Vessel" type="text" />
                <Field label="Port of Loading" type="text" />
                <Field label="Port of Discharge" type="text" />
                <Field label="ETA" type="text" />
                <Field label="ETD" type="text" />
                <Field label="Name of Commodity" type="text" />
                <Field label="Qty of Goods" type="number" />
                <Field label="Gross Weight" type="number" />
                <Field label="Net Weight" type="number" />
                <Field label="Invoice No." type="text" />
                <Field label="Invoice Date" type="date" />
                <Field label="Invoice Value" type="number" />

                <div className="col-span-2 text-right mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                </div>
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