import { Card } from "../../../../components/ui/card";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function CommercialInvoice() {
    return (
        <Card>
            <div className="max-w-[800px] mx-auto p-4">
                <h1 className="text-center text-lg font-bold mb-4">Commercial Invoice (LC)</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <h2 className="font-semibold">Exporter</h2>
                        <TextArea label="Exporter Details" />
                    </div>

                    <Field label="Invoice No." type="text" />
                    <Field label="Invoice Date" type="date" />
                    <Field label="Exporter’s Ref." type="text" />
                    <Field label="Buyer’s Order No. & Date" type="text" />
                    <Field label="Other Reference(s)" type="text" />

                    <div className="col-span-2">
                        <h2 className="font-semibold">Consignee</h2>
                        <TextArea label="Consignee Details" />
                    </div>

                    <div className="col-span-2">
                        <h2 className="font-semibold">Buyer (if other than Consignee)</h2>
                        <TextArea label="Buyer Details" />
                    </div>

                    <Field label="Pre-carriage by Road" type="text" />
                    <Field label="Place of Receipt by pre-carrier" type="text" />
                    <Field label="Country of Origin of Goods" type="text" />
                    <Field label="Country of Final Destination" type="text" />
                    <Field label="Vessel / Flight No." type="text" />
                    <Field label="Port of Loading" type="text" />
                    <Field label="Port of Discharge" type="text" />
                    <Field label="Final Destination" type="text" />

                    <div className="col-span-2">
                        <h2 className="font-semibold">Marks & Nos. / No. & Kind of Pkgs., Description of Goods</h2>
                        <TextArea label="Description of Goods" />
                    </div>

                    <Field label="Quantity (POLY BAG)" type="number" />
                    <Field label="Quantity (PCS)" type="number" />
                    <Field label="Rate (USD/PCS)" type="number" />
                    <Field label="Amount (USD)" type="number" />

                    <div className="col-span-2">
                        <h2 className="font-semibold">Amount Chargeable</h2>
                        <TextArea label="Amount in Words" />
                    </div>

                    <div className="col-span-2 text-right mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                    </div>
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