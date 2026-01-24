import { Card } from "../../../../components/ui/card";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function BillofLanding() {
    return (
        <Card>
            <div className="max-w-[800px] mx-auto p-4">
                <h1 className="text-center text-lg font-bold mb-4">Bill of Landing Draft</h1>
                <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                        <h2 className="font-semibold">Exporter</h2>
                        <TextArea label="Exporter Details" />
                    </div>

                    <Field label="Bill of Lading No." type="text" />
                    <Field label="Date" type="date" />
                    <Field label="Name & Address of Shipping Agent in Importing Country" type="text" />

                    <div className="col-span-2">
                        <h2 className="font-semibold">Consignee</h2>
                        <TextArea label="Consignee Details" />
                    </div>

                    <div className="col-span-2">
                        <h2 className="font-semibold">Notify Party</h2>
                        <TextArea label="Notify Party Details" />
                    </div>

                    <Field label="Pre-carriage by" type="text" />
                    <Field label="Place of Receipt by pre-carriage" type="text" />
                    <Field label="Vessel / Flight No." type="text" />
                    <Field label="Port of Loading" type="text" />
                    <Field label="Port of Discharge" type="text" />
                    <Field label="Final Destination" type="text" />

                    <Field label="Container No." type="text" />
                    <Field label="Marks and Numbers" type="text" />
                    <TextArea label="Number of packages, kinds of packages, general description of goods" />
                    <Field label="Gross Weight" type="number" />
                    <Field label="Measurement" type="text" />

                    <Field label="Freight Amount" type="number" />
                    <Field label="Freight Payable By" type="text" />
                    <Field label="Number of Original BUMTD(s)" type="text" />
                    <Field label="Place and Date of Issue" type="text" />

                    <div className="col-span-2">
                        <h2 className="font-semibold">Other Particulars</h2>
                        <TextArea label="Other Particulars" />
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