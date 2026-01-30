import { Card } from "../../../../components/ui/card";
import { CommonTextField } from "../../../../components/widgets/common_textField";
import { Button } from "../../../../components/ui/button";

export default function CoverLetterLc() {
    return (
        <Card>
            <div className="max-w-[800px] mx-auto p-4">
                <h1 className="text-xl font-bold mb-4">Covering Letter For Post Shipment Under LC</h1>
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

                    <TextArea label="Additional Instructions" />

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
    "5. Certificate of Origin",
    "6. Original SDF form exchange control copy",
    "7. Original SDF form exchange control copy",
    "8. Original SDF form exchange control copy",
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

function TextArea({ label }) {
    return (
        <div className="grid grid-cols-[1fr_2fr] gap-2">
            <span>{label}:</span>
            <CommonTextField
                type='textarea'
            />
        </div>
    );
}