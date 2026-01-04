import CommonButton from "../../../components/widgets/common_button";
import { Card } from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { CommonTextField } from "../../../components/widgets/common_textField";

export default function InvoiceForm({ title }) {
    return (
        <Card className="p-4 space-y-4">
            <form>
                <div className="border text-center py-3 font-semibold uppercase">
                    {title}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    <div className="border p-3 space-y-2">
                        <Label className="uppercase font-semibold">Shipping Details</Label>
                        <div className="bg-gray-50 p-3 space-y-2">
                            <Field label="Name" />
                            <Field label="Address" />
                            <Field label="GSTIN" />
                            <Field label="State" />
                            <Field label="Code" />
                        </div>
                    </div>

                    <div className="border p-3 space-y-2">
                        <Label className="uppercase font-semibold">Billing Details</Label>
                        <div className="bg-gray-50 p-3 space-y-2">
                            <Field label="Name" />
                            <Field label="Address" />
                            <Field label="GSTIN" />
                            <Field label="State" />
                            <Field label="Code" />
                        </div>
                    </div>

                    <div className="border p-3 space-y-2">
                        <Label className="uppercase font-semibold">Invoice Details</Label>
                        <div className="bg-gray-50 p-3 space-y-2">
                            <Field label="Invoice No" />
                            <Field label="Invoice Date" />
                            <Field label="State" />
                            <Field label="State Code" />
                            <Field label="Haste" />
                            <Field label="Haste Contact" />
                        </div>
                    </div>
                </div>

                <div className="border overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b">
                                {[
                                    "Sr No.",
                                    "Product Description",
                                    "HSN Code",
                                    "UNIT OF MEASURE",
                                    "Qty",
                                    "Rate",
                                    "Amount",
                                    "IGST",
                                    "CGST",
                                    "SGST",
                                    "Final",
                                ].map((h) => (
                                    <th key={h} className="border px-2 py-1 text-left font-medium bg-gray-50">
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {[1,].map((row) => (
                                <tr key={row}>
                                    {Array.from({ length: 11 }).map((_, i) => (
                                        <td key={i} className="border px-1 py-1">
                                            <CommonTextField />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="border p-3 space-y-2 col-span-2 bg-gray-50">
                        <div className="space-y-2">
                            <Label className='uppercase'>Amount in Words</Label>
                            <CommonTextField type="textarea" className="w-full border rounded p-2" rows={4} />
                        </div>
                        <div className="space-y-2">
                            <Label className='uppercase'>PAYMENT TERM</Label>
                            <CommonTextField type="textarea" className="w-full border rounded p-2" rows={4} />
                        </div>
                    </div>

                    <div className="border p-3 space-y-2 col-span-1">
                        <div className="bg-gray-50 p-3 space-y-2">
                            <Field label="HASTE (COMMITION)" />
                            <Field label="DELIVERY CHARGE" />
                            <Field label="TOTAL TAX AMOUNT" />
                            <Field label="INSURANCE (IF)" />
                            <Field label="TOTAL AMOUNT" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3">
                    <div className="border p-3 space-y-2">
                        <Label className="uppercase font-semibold">Transport Details</Label>
                        <div className="bg-gray-50 p-3 space-y-2">
                            <Field label="NAME" />
                            <Field label="LORRY NO" />
                            <Field label="CONTACT NO" />
                            <Field label="COMPANY" />
                        </div>
                    </div>
                    <div className="border p-3 space-y-2">
                        <Label className="uppercase font-semibold">BANK DETAILS</Label>
                        <div className="bg-gray-50 p-3 space-y-2">
                            <Field label="NAME" />
                            <Field label="ACC NO." />
                            <Field label="IFSC CODE" />
                            <Field label="BRANCH" />
                        </div>
                    </div>
                    <div className="border p-3">
                        <Label className="uppercase font-semibold">TERMS</Label>
                        <div className="bg-gray-50 p-3">
                            <h5>Subjected to surat jurisdiction</h5>
                            <div className="h-20" />
                            <h5>Sign & Stamp</h5>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-5 border-t max-w-96">
                    <CommonButton
                        type="submit"
                        className="no-print w-full py-3 text-lg rounded-md"
                        onClick={() => window.print()}
                    >
                        Print
                    </CommonButton>
                    <CommonButton
                        variant="destructive"
                        className="w-full py-3 text-lg rounded-md"
                    >
                        Cancel
                    </CommonButton>
                </div>
            </form>
        </Card>
    );
}

function Field({ label }) {
    return (
        <div className="flex items-center gap-2">
            <Label className="w-28 text-sm uppercase">{label}</Label>
            <CommonTextField className="flex-1" />
        </div>
    );
}