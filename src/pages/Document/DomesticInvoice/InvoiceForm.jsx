import CommonButton from "../../../components/widgets/common_button";
import { Card } from "../../../components/ui/card";

export default function InvoiceForm({ title }) {
    return (
        <Card className="p-2 md:p-4 space-y-4">
            <style>{`
                @media print {
                    @page { size: A4; margin: 8mm; }
                    body { margin: 0; background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                    body * { visibility: hidden; }
                    #print-section, #print-section * { visibility: visible; }
                    #print-section {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        padding: 0 !important;
                        margin: 0 !important;
                        border: none !important;
                        box-shadow: none !important;
                        page-break-inside: avoid;
                    }
                    .no-print { display: none !important; }
                    input, textarea {
                        color: black !important;
                        -webkit-text-fill-color: black !important;
                    }
                }
            `}</style>
            
            <form id="print-section" className="w-full max-w-5xl mx-auto text-black bg-white print:text-[10px]">
                <div className="text-center mb-1 print:mb-0">
                    <div className="mx-auto w-16 h-16 rounded-full border border-amber-900 flex items-center justify-center font-bold text-lg mb-0.5 text-amber-900">
                        <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-[9px] text-gray-500 mb-0.5">SourceSeas</p>
                    <h2 className="font-bold text-sm print:text-xs">SourceSeas Overseas Pvt. Ltd.</h2>
                    <p className="text-[11px] print:text-[9px]">Address : C 604 ,shree nidhi res.,nr sudama chowk,satelite road,mota varachha,surat(guj)india-394101</p>
                    <p className="text-[11px] print:text-[9px]">Email - mgmt.sourceseas@gmail.com | Contact info - +91 9925099215</p>
                </div>

                <div className="border-t-[3px] border-amber-900 mb-1 print:mb-1"></div>

                <div className="border border-gray-400 text-[11px] print:text-[10px]">
                    <div className="text-center font-bold border-b border-gray-400 p-1 print:p-0.5 uppercase text-sm print:text-xs">
                        {title}
                    </div>

                    <div className="grid grid-cols-3 border-b border-gray-400 text-center font-bold uppercase divide-x divide-gray-400">
                        <div className="p-1 print:p-0.5">SHIPPING DETAILS</div>
                        <div className="p-1 print:p-0.5">BILLING DETAILS</div>
                        <div className="p-1 print:p-0.5">INVOICE DETAILS</div>
                    </div>

                    <div className="grid grid-cols-3 border-b border-gray-400 divide-x divide-gray-400">
                        <div className="p-1.5 print:p-1 space-y-0.5">
                            <Field label="NAME :" />
                            <Field label="ADDRESS :" isTextArea />
                            <Field label="GSTIN:" />
                            <Field label="STATE:" />
                            <Field label="CODE:" />
                        </div>
                        <div className="p-1.5 print:p-1 space-y-0.5">
                            <Field label="NAME :" />
                            <Field label="ADDRESS :" isTextArea />
                            <Field label="GSTIN:" />
                            <Field label="STATE:" />
                            <Field label="CODE:" />
                        </div>
                        <div className="p-1.5 print:p-1 space-y-0.5">
                            <Field label="INVOICE NO:" />
                            <Field label="INVOICE DATE:" />
                            <Field label="STATE:" />
                            <Field label="STATE CODE:" />
                            <Field label="HASTE:" />
                            <Field label="HASTE CONTACT:" />
                        </div>
                    </div>

                    <table className="w-full text-[11px] print:text-[10px] border-collapse text-center">
                        <thead>
                            <tr className="border-b border-gray-400 uppercase font-bold divide-x divide-gray-400">
                                {["Sr No.", "Product Desc.", "HSN Code", "UNIT OF MEASURE", "QTY", "RATE", "Amount", "IGST", "CGST", "SGST", "Final"].map((h) => (
                                    <th key={h} className="p-1 print:p-0.5 font-bold">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-400">
                            {[1, 2, 3, 4].map((row) => (
                                <tr key={row} className="divide-x divide-gray-400">
                                    {Array.from({ length: 11 }).map((_, i) => (
                                        <td key={i} className="p-0 border-b border-gray-400">
                                            <TableInput />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="grid grid-cols-[2fr_1fr] border-b border-gray-400 divide-x divide-gray-400">
                        <div className="p-1.5 print:p-1 flex flex-col justify-between">
                            <div className="flex gap-2">
                                <span className="font-bold whitespace-nowrap uppercase pt-1">AMOUNT IN WORDS</span>
                                <textarea className="flex-1 min-h-[20px] resize-none outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-1 bg-transparent print:border-none print:resize-none" rows={2} />
                            </div>
                            <div className="flex gap-2 mt-1">
                                <span className="font-bold whitespace-nowrap uppercase pt-1">PAYMENT TERM</span>
                                <textarea className="flex-1 min-h-[20px] resize-none outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-1 bg-transparent print:border-none print:resize-none" rows={2} />
                            </div>
                        </div>
                        <div className="p-0 flex flex-col uppercase">
                            <AmountRow label="HASTE (COMMITION)" />
                            <AmountRow label="DELIVERY CHARGE" />
                            <AmountRow label="TOTAL TAX AMOUNT" />
                            <AmountRow label="INSURANCE (IF)" />
                            <AmountRow label="TOTAL AMOUNT" isLast />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 border-b border-gray-400 text-center font-bold uppercase divide-x divide-gray-400">
                        <div className="p-1 print:p-0.5">TRANSPORTER DETAILS</div>
                        <div className="p-1 print:p-0.5">BANK DETAILS</div>
                        <div className="p-1 print:p-0.5">TERMS</div>
                    </div>

                    <div className="grid grid-cols-3 divide-x divide-gray-400">
                        <div className="p-1.5 print:p-1 space-y-0.5 uppercase">
                            <Field label="NAME:" />
                            <Field label="LORRY NO:" />
                            <Field label="CONTACT NO:" />
                            <Field label="COMPANY:" />
                        </div>
                        <div className="p-1.5 print:p-1 space-y-0.5 uppercase">
                            <Field label="NAME :" defaultValue="AXIS BANK LTD." />
                            <Field label="ACC NO. :" defaultValue="917020053594034" />
                            <Field label="IFSC CODE :" defaultValue="UTIB0002341" />
                            <Field label="BRANCH" defaultValue="MOTA VARACHHA" />
                        </div>
                        <div className="p-1.5 print:p-1 flex flex-col justify-between text-[11px] print:text-[10px]">
                            <div>Subjected to surat jurisdiction</div>
                            <div className="mt-6 font-bold">Sign & Stamp</div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-5 max-w-96 no-print print:hidden mt-4 mx-auto">
                    <CommonButton
                        type="button"
                        className="w-full py-3 text-lg rounded-md"
                        onClick={() => window.print()}
                    >
                        Print / Download PDF
                    </CommonButton>
                    <CommonButton
                        type="button"
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

function Field({ label, isTextArea, defaultValue }) {
    return (
        <div className="flex items-start gap-1">
            <span className="whitespace-nowrap pt-0.5 font-medium">{label}</span>
            {isTextArea ? (
                <textarea 
                    className="flex-1 min-h-[20px] text-[11px] print:text-[10px] resize-none outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-1 bg-transparent print:border-none print:resize-none print:p-0 print:m-0 print:overflow-hidden" 
                    defaultValue={defaultValue}
                    rows={2}
                />
            ) : (
                <input 
                    type="text" 
                    className="flex-1 outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-1 bg-transparent print:border-none print:p-0 print:m-0 text-[11px] print:text-[10px]" 
                    defaultValue={defaultValue}
                />
            )}
        </div>
    );
}

function TableInput() {
    return (
        <input 
            type="text" 
            className="w-full h-full min-h-[20px] text-center outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-1 bg-transparent print:border-none print:p-0 print:m-0 text-[11px] print:text-[10px]"
        />
    );
}

function AmountRow({ label, isLast }) {
    return (
        <div className={`grid grid-cols-[1fr_100px] ${!isLast ? 'border-b border-gray-400' : ''}`}>
            <div className="p-1 pl-2 flex items-center font-medium">{label}</div>
            <div className="border-l border-gray-400 p-0">
                <input type="text" className="w-full h-full min-h-[20px] px-1 outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 bg-transparent print:border-none text-[11px] print:text-[10px]" />
            </div>
        </div>
    );
}