import { Card } from "../../../../components/ui/card";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { Button } from "../../../../components/ui/button";

export default function CoverLetterUnderCollection() {
    return (
        <Card>
            <div className="max-w-[800px] mx-auto p-4">
                <h1 className="text-xl font-bold mb-4">Covering Letter For Post Shipment Under Collection</h1>
                <form className="space-y-4">
                    <Field label="Date" type="date" />
                    <Field label="The Manager," type="text" />
                    <h2 className="text-sm font-semibold">Dear Sir,</h2>
                    <Field label="Subject" type="text" />

                    <h2 className="text-sm font-semibold mt-6">We are enclosing here with following documents under above LC:</h2>

                    <div className="grid grid-cols-[2fr_1fr_1fr] gap-4">
                        <span className="font-semibold">Documents</span>
                        <span className="font-semibold">Originals</span>
                        <span className="font-semibold">Copies</span>

                        {documentFields.map((doc, index) => (
                            <div key={index} className="contents">
                                <span>{doc}</span>
                                <CommonTextField type="text" placeholder="Originals" />
                                <CommonTextField type="text" placeholder="Copies" />
                            </div>
                        ))}
                    </div>

                    <CommonTextField
                        type='textarea'
                        value="(If you have facility and would like your bank to purchase than mention following sentence) Kindly purchase above document and credit proceeds to our EPC/PCFC on FIFO basis or C/A (as applicable)."
                    />

                    <CommonTextField
                        type='textarea'
                        value="Kindly forward documents to collecting bank name and address as below:
                                (Name, address, SWIFT code of collecting bank. Account, contact and fax number, email address of buyer, if available)"
                    />

                    <CommonTextField
                        label="Please incorporate following instructions to collecting bank:"
                        type='textarea'
                        rows={13}
                        value="
                                1.	This collection document is subject to URC 522
                                2.	Deliver documents against payment/acceptance
                                3.	All bank charges of collecting bank are on account of drawee. Charges may/may not be waived.
                                4.	Interest for late payment to be collected from drawee @(…% pa. to be calculated at 360 days) from date of presentation till date of payment. Interest may/may not be waived.
                                5.	Reimbursement charges are on account of drawee. Charges may not be waived.
                                6.	Advice non-payment/non-acceptance by SWIFT within 10 days from date of presenting to drawee with the reason.
                                7.	In case of non-payment/non-acceptance arrange for storage and insurance of goods. The charges for the same will be collected from drawee. In case ultimate non-payment/non-acceptance, the same will be on account of principal.
                        "
                    />

                    <div className="text-right mt-4">
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </Card>
    );
}

const documentFields = [
    "1. Bill of Exchange",
    "2. Invoice",
    "3. Packing List",
    "4. Bills of Lading / Airway Bill",
    "5. Certificate of origin",
    "6. Original SDF form exchange control copy"
];

function Field({ label, type }) {
    return (
        <div className="grid grid-cols-[1fr_2fr] items-center gap-2">
            <span>{label}:</span>
            <CommonTextField
                type={type || 'text'}
            />
        </div>
    );
}

function TextArea({ label, value }) {
    return (
        <div className="grid grid-cols-[1fr_2fr] gap-2">
            <span>{label}:</span>
            <CommonTextField
                type='textarea'
                value={value}
            />
        </div>
    );
}