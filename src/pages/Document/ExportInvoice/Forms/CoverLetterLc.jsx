import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";

export default function CoverLetterLc() {
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
                    <h1 className="text-center text-lg font-bold mb-6 uppercase underline">Covering Letter For Post Shipment Under LC</h1>
                    
                    <div className="space-y-4">
                        <Field label="Date" type="date" />
                        <Field label="The Manager," type="text" />
                        
                        <h2 className="text-sm font-semibold mt-6 mb-2">Dear Sir,</h2>
                        <Field label="Subject" type="text" />

                        <h2 className="text-sm font-semibold mt-6 mb-3">We are enclosing here with following documents under above LC:</h2>

                        <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 mb-6">
                            <span className="font-semibold border-b border-gray-300 pb-1">Documents</span>
                            <span className="font-semibold border-b border-gray-300 pb-1">Originals</span>
                            <span className="font-semibold border-b border-gray-300 pb-1">Copies</span>

                            {documentFields.map((doc, index) => (
                                <div key={index} className="contents">
                                    <span className="py-1">{doc}</span>
                                    <input 
                                        type="text" 
                                        placeholder="Originals" 
                                        className="w-full outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-2 py-1 bg-transparent print:border-none print:p-0 print:m-0"
                                    />
                                    <input 
                                        type="text" 
                                        placeholder="Copies" 
                                        className="w-full outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-2 py-1 bg-transparent print:border-none print:p-0 print:m-0"
                                    />
                                </div>
                            ))}
                        </div>

                        <TextArea label="Additional Instructions" />
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
        <div className="grid grid-cols-[1fr_2fr] items-center gap-2 border-b border-gray-200 pb-2 print:border-none print:pb-0">
            <span className="font-medium">{label} :</span>
            <input 
                type={type || 'text'}
                className="w-full outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-2 py-1 bg-transparent print:border-none print:p-0 print:m-0"
            />
        </div>
    );
}

function TextArea({ label }) {
    return (
        <div className="grid grid-cols-[1fr_2fr] items-start gap-2 border-b border-gray-200 pb-2 print:border-none print:pb-0">
            <span className="font-medium pt-1">{label} :</span>
            <textarea
                rows={3}
                className="w-full resize-none outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-2 py-1 bg-transparent print:border-none print:p-0 print:m-0 print:overflow-hidden"
            />
        </div>
    );
}