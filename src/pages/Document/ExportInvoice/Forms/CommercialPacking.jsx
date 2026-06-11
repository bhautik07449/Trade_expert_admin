import { useState } from "react";
import { Card } from "../../../../components/ui/card";
import CommonButton from "../../../../components/widgets/common_button";

export default function CommercialPacking() {
    const [formData, setFormData] = useState({
        exporter: "",
        invoiceNo: "",
        invoiceDate: "",
        exportNo: "",
        buyerRef: "",
        consignee: "",
        preCarriageByRoad: "",
        placeOfReceipt: "",
        countryOfOrigin: "",
        countryOfFinalDestination: "",
        vesselFlightNo: "",
        portOfLoading: "",
        portOfDischarge: "",
        finalDestination: "",
        marksAndNumbers: "",
        descriptionOfGoods: "",
        quantity: "",
        netWeight: "",
        grossWeight: "",
        termsOfDeliveryAndPayment: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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

            <form id="print-section" className="w-full max-w-4xl mx-auto text-black bg-white print:text-[12px]" onSubmit={(e) => e.preventDefault()}>
                <div className="text-center mb-4 print:mb-2">
                    <div className="mx-auto w-16 h-16 rounded-full border border-amber-900 flex items-center justify-center font-bold text-lg mb-0.5 text-amber-900">
                        <img src="/logo.jpg" alt="Logo" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-[10px] text-gray-500 mb-0.5">SourceSeas</p>
                    <h2 className="font-bold text-sm print:text-sm">SourceSeas Overseas Pvt. Ltd.</h2>
                    <p className="text-[12px] print:text-[10px]">Address : C 604 ,shree nidhi res.,nr sudama chowk,satelite road,mota varachha,surat(guj)india-394101</p>
                    <p className="text-[12px] print:text-[10px]">Email - mgmt.sourceseas@gmail.com | Contact info - +91 9925099215</p>
                </div>

                <div className="border-t-[3px] border-amber-900 mb-4 print:mb-2"></div>

                <div className="border border-gray-400 p-6 print:p-4 text-[13px] print:text-[12px]">
                    <h1 className="text-center text-lg font-bold mb-6 uppercase underline">Commercial Packing List</h1>

                    <div className="grid grid-cols-2 gap-4 gap-y-3">
                        <div className="col-span-2">
                            <TextArea label="Exporter" title="Exporter" onChange={handleChange} name="exporter" value={formData.exporter} />
                        </div>

                        <Field label="Invoice No." type="text" onChange={handleChange} name="invoiceNo" value={formData.invoiceNo} />
                        <Field label="Invoice Date" type="date" onChange={handleChange} name="invoiceDate" value={formData.invoiceDate} />
                        <Field label="Exporter's Ref." type="text" onChange={handleChange} name="exportNo" value={formData.exportNo} />
                        <Field label="Buyer (Other than Consignee)" type="text" onChange={handleChange} name="buyerRef" value={formData.buyerRef} />

                        <div className="col-span-2">
                            <TextArea label="Consignee" title="Consignee" onChange={handleChange} name="consignee" value={formData.consignee} />
                        </div>

                        <Field label="Pre-carriage by Road" type="text" onChange={handleChange} name="preCarriageByRoad" value={formData.preCarriageByRoad} />
                        <Field label="Place of Receipt by Pre-carrier" type="text" onChange={handleChange} name="placeOfReceipt" value={formData.placeOfReceipt} />
                        <Field label="Country of Origin of Goods" type="text" onChange={handleChange} name="countryOfOrigin" value={formData.countryOfOrigin} />
                        <Field label="Country of Final Destination" type="text" onChange={handleChange} name="countryOfFinalDestination" value={formData.countryOfFinalDestination} />
                        <Field label="Vessel/Flight No." type="text" onChange={handleChange} name="vesselFlightNo" value={formData.vesselFlightNo} />
                        <Field label="Port of Loading" type="text" onChange={handleChange} name="portOfLoading" value={formData.portOfLoading} />
                        <Field label="Port of Discharge" type="text" onChange={handleChange} name="portOfDischarge" value={formData.portOfDischarge} />
                        <Field label="Final Destination" type="text" onChange={handleChange} name="finalDestination" value={formData.finalDestination} />

                        <div className="col-span-2">
                            <TextArea label="Marks & Nos./No. & Kind of Pkgs." title="Marks & Numbers" onChange={handleChange} name="marksAndNumbers" value={formData.marksAndNumbers} />
                        </div>

                        <div className="col-span-2">
                            <TextArea label="Description of Goods" title="Goods Description" onChange={handleChange} name="descriptionOfGoods" value={formData.descriptionOfGoods} />
                        </div>

                        <Field label="Quantity" type="number" onChange={handleChange} name="quantity" value={formData.quantity} />
                        <Field label="Net Weight" type="number" onChange={handleChange} name="netWeight" value={formData.netWeight} />
                        <Field label="Gross Weight" type="number" onChange={handleChange} name="grossWeight" value={formData.grossWeight} />

                        <div className="col-span-2">
                            <TextArea label="Terms of Delivery and Payment" title="Terms of Delivery and Payment" onChange={handleChange} name="termsOfDeliveryAndPayment" value={formData.termsOfDeliveryAndPayment} />
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

function Field({ label, type, onChange, name, value }) {
    return (
        <div className="grid grid-cols-[1fr_2fr] items-center gap-2 border-b border-gray-200 pb-2 print:border-none print:pb-0">
            <span className="font-medium">{label} :</span>
            <input
                type={type || 'text'}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-2 py-1 bg-transparent print:border-none print:p-0 print:m-0"
            />
        </div>
    );
}

function TextArea({ label, title, onChange, name, value }) {
    return (
        <div className="border-b border-gray-200 pb-2 print:border-none print:pb-0">
            {title && <h2 className="font-semibold mb-1">{title}</h2>}
            <div className="grid grid-cols-[1fr_4fr] items-start gap-2">
                <span className="font-medium pt-1">{label} :</span>
                <textarea
                    rows={3}
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full resize-none outline-none border border-transparent hover:border-gray-300 focus:border-gray-400 rounded px-2 py-1 bg-transparent print:border-none print:p-0 print:m-0 print:overflow-hidden"
                />
            </div>
        </div>
    );
}