import CommonButton from "../../../../components/widgets/common_button";
import { Card } from "../../../../components/ui/card";
import { CommonTextField } from "../../../../components/widgets/common_textField";

export default function Quotation() {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="p-6 print:p-0">
            <Card>
                <div className="max-w-[800px] mx-auto p-6 print:shadow-none print:border-none">
                    <h3 className="text-center text-lg font-bold mb-6">
                        Expression of Interest
                    </h3>

                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div />
                        <div className="space-y-2">
                            <Field label="Date" />
                            <Field label="Ref. No" />
                        </div>
                    </div>

                    <p className="text-sm mb-4">
                        To,<br />
                        The Importer
                    </p>

                    <p className="text-sm mb-4">
                        Sub expression of interest for supply. Sourcesos Overseas
                        Pvt. Ltd. hereby confirm with full legal & corporate
                        responsibility & under the penalty of perjury that we are
                        ready, willing & able to enter into a contract for supply of
                        following commodity to your esteemed organization as stated
                        below:
                    </p>

                    <div className="space-y-3 text-sm">
                        <Field label="Commodity" />
                        <Field label="Original Country" />
                        <Field label="Quality (Grade)" />
                        <Field label="Packaging" />
                        <Field label="Quantity" />
                        <Field label="Delivery Terms" />
                        <Field label="Rates" />
                        <Field label="Certification" />
                        <TextArea label="Cargo Breakup" type='textara' />
                    </div>

                    <p className="text-sm my-4">
                        We assure & hope you will find our quality as per your
                        requirement with competitive pricing.
                    </p>

                    <h4 className="font-semibold text-sm mb-4 text-center h5-bold border-t border-b py-3">
                        Company Details & Terms
                    </h4>

                    <div className="space-y-2 text-sm">
                        <Field label="Name" value="Sourcesos Overseas Pvt. Ltd." />
                        <Field label="Origin" value="Surat (Gujarat), India - 394101" />
                        <Field
                            label="Address"
                            value="E-604, Shree nathji Res., Satellite Road, Mota Varachha, Surat (GUJ), India - 394101"
                        />
                        <Field label="APEDA Lic No" value="187000" />
                        <Field label="IEC Code" value="2516914412" />
                    </div>

                    <h4 className="font-semibold text-sm mt-4 mb-2">Terms</h4>
                    <CommonTextField
                        type="textarea"
                        className="overflow-auto print:h-auto print:overflow-visible"
                    />

                    <div className="my-2">
                        "Waiting to deliver delightful customer experience ahead."
                    </div>
                    <div className="mt-10 text-sm text-right">
                        <p>Thanks & Regards,</p>
                        <p className="font-semibold mt-2">Trade expert</p>
                        <p>Export Regional Manager</p>
                        <p>Sourcesos Overseas Pvt. Ltd.</p>
                    </div>
                </div>
            <div className="flex justify-end pr-4 mb-4 print:hidden">
                <CommonButton
                    onClick={handlePrint}
                >
                    Print
                </CommonButton>
            </div>
            </Card>
        </div >
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