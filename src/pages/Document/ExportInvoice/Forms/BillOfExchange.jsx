import { Card } from "../../../../components/ui/card";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { Button } from "../../../../components/ui/button";

export default function BillOfExchange() {
    return (
        <Card>
            <div className="mx-auto p-4">
                <h1 className="text-center text-lg font-bold mb-4">Bill Of Exchange (Collection)</h1>
                <form className="space-y-4">
                    <Field label="Date" placeholder="Enter Date" type="date" />
                    <Field label="Amount" placeholder="Enter Amount" type="number" />
                    <Field label="Due date (in case of DA)" placeholder="Enter Due Date" type="date" />
                    <Field label="Pay at (at sight/DA i.e days from date of BL as agreed)" placeholder="Enter Days" type="text" />
                    <Field label="(name and place of exporter)" placeholder="Enter Name and Place" type="text" />
                    <Field label="A sum of FCY & Amount" placeholder="Enter Amount" type="number" />
                    <Field label="(FCY and amount in words)" placeholder="Enter Amount in Words" type="text" />
                    <Field label="Being value received against our invoice No" placeholder="Enter Invoice Number" type="text" />
                    <Field label="Dated" placeholder="Enter Date" type="date" />

                    <div className="mt-6">
                        <h2 className="font-semibold">FOR,</h2>
                        <p>Sourcesas Overseas Pvt. Ltd.</p>
                        <p className="mt-4">AUTHORISED SIGNATORY</p>
                    </div>

                    <TextArea label="Drawn on" placeholder="Name and address of buyer" />

                    <div className="text-right mt-4">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}

function Field({ label, placeholder, type }) {
    return (
        <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
            <span>{label}:</span>
            <CommonTextField
                type={type || 'text'}
                placeholder={placeholder}
            />
        </div>
    );
}

function TextArea({ label, placeholder }) {
    return (
        <div className="grid grid-cols-[1fr_2fr] gap-2">
            <span>{label}:</span>
            <CommonTextField
                type='textarea'
                placeholder={placeholder}
            />
        </div>
    );
}