import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";

export default function BillOfExchangeLC() {
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
                    input[type="date"]::-webkit-calendar-picker-indicator {
                        display: none !important;
                        -webkit-appearance: none;
                    }
                }
            `}</style>

            <form id="print-section" className="w-full max-w-4xl mx-auto text-black bg-white print:text-[12px]">
                <div className="text-center mb-4 print:mb-2">
                    <div className="mx-auto w-14 h-14 rounded-full border border-amber-900 flex items-center justify-center font-bold text-xl mb-1 text-amber-900">
                        S2
                    </div>
                    <p className="text-[10px] text-gray-500 mb-0.5">SourceSeas</p>
                    <h2 className="font-bold text-sm print:text-sm">SourceSeas Overseas Pvt. Ltd.</h2>
                    <p className="text-[12px] print:text-[10px]">Address : C 604 ,shree nidhi res.,nr sudama chowk,satelite road,mota varachha,surat(guj)india-394101</p>
                    <p className="text-[12px] print:text-[10px]">Email - mgmt.sourceseas@gmail.com | Contact info - +91 9925099215</p>
                </div>

                <div className="border-t-[3px] border-amber-900 mb-4 print:mb-2"></div>

                <div className="border border-gray-400 p-6 print:p-4 text-[13px] print:text-[12px]">
                    <h1 className="text-center text-lg font-bold mb-6 uppercase underline">Bill of Exchange (sole)</h1>
                    
                    <div className="space-y-3">
                        <Field label="Date" placeholder="Enter Date" type="date" />
                        <Field label="Amount" placeholder="Enter Amount" type="number" />
                        <Field label="Due date (in case of DA)" placeholder="Enter Due Date" type="date" />
                        <Field label="Pay at (at sight/DA i.e days from date of BL as agreed)" placeholder="Enter Days" type="text" />
                        <Field label="Name and place of exporter" placeholder="Enter Name and Place" type="text" />
                        <Field label="A sum of FCY & Amount" placeholder="Enter Amount" type="text" />
                        <Field label="FCY and amount in words" placeholder="Enter Amount in Words" type="text" />
                        <Field label="Being value received against our invoice No" placeholder="Enter Invoice Number" type="text" />
                        <Field label="Dated" placeholder="Enter Date" type="date" />
                        
                        <TextArea label="Drawn on" placeholder="Name and address of buyer" />
                        
                        <div className="mt-10 grid grid-cols-2">
                            <div></div>
                            <div className="text-right">
                                <h2 className="font-semibold uppercase mb-1">FOR,</h2>
                                <p className="font-bold">Sourceseas Overseas Pvt. Ltd.</p>
                                <div className="h-16"></div>
                                <p className="font-bold">AUTHORISED SIGNATORY</p>
                            </div>
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

function Field({ label, placeholder, type }) {
    return (
        <div className="grid grid-cols-[1fr_2fr] items-center gap-2 border-b border-gray-200 pb-2 print:border-none print:pb-0">
            <span className="font-medium">{label} :</span>
            <input 
                type={type || 'text'}
                placeholder={placeholder}
                className="w-full outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-2 py-1 bg-transparent print:border-none print:p-0 print:m-0"
            />
        </div>
    );
}

function TextArea({ label, placeholder }) {
    return (
        <div className="grid grid-cols-[1fr_2fr] items-start gap-2 border-b border-gray-200 pb-2 print:border-none print:pb-0">
            <span className="font-medium pt-1">{label} :</span>
            <textarea
                placeholder={placeholder}
                rows={3}
                className="w-full resize-none outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-2 py-1 bg-transparent print:border-none print:p-0 print:m-0 print:overflow-hidden"
            />
        </div>
    );
}