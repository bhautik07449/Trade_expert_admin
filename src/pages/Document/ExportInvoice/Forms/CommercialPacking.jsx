import { useState } from "react";
import { Card } from "../../../../components/ui/card";
import { CommonTextField } from "../../../../components/widgets/common_textField";

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
        <Card>
            <div className="max-w-[800px] mx-auto p-4">
                <h2 className="text-center text-xl font-bold mb-4">Commercial Packing List</h2>
                <form className="space-y-4">
                    <Field label="Exporter" type="text" onChange={handleChange} name="exporter" value={formData.exporter} />
                    <Field label="Invoice No." type="text" onChange={handleChange} name="invoiceNo" value={formData.invoiceNo} />
                    <Field label="Invoice Date" type="date" onChange={handleChange} name="invoiceDate" value={formData.invoiceDate} />
                    <Field label="Exporter's Ref." type="text" onChange={handleChange} name="exportNo" value={formData.exportNo} />
                    <Field label="Buyer (Other than Consignee)" type="text" onChange={handleChange} name="buyerRef" value={formData.buyerRef} />
                    <TextArea label="Consignee" onChange={handleChange} name="consignee" value={formData.consignee} />
                    <Field label="Pre-carriage by Road" type="text" onChange={handleChange} name="preCarriageByRoad" value={formData.preCarriageByRoad} />
                    <Field label="Place of Receipt by Pre-carrier" type="text" onChange={handleChange} name="placeOfReceipt" value={formData.placeOfReceipt} />
                    <Field label="Country of Origin of Goods" type="text" onChange={handleChange} name="countryOfOrigin" value={formData.countryOfOrigin} />
                    <Field label="Country of Final Destination" type="text" onChange={handleChange} name="countryOfFinalDestination" value={formData.countryOfFinalDestination} />
                    <Field label="Vessel/Flight No." type="text" onChange={handleChange} name="vesselFlightNo" value={formData.vesselFlightNo} />
                    <Field label="Port of Loading" type="text" onChange={handleChange} name="portOfLoading" value={formData.portOfLoading} />
                    <Field label="Port of Discharge" type="text" onChange={handleChange} name="portOfDischarge" value={formData.portOfDischarge} />
                    <Field label="Final Destination" type="text" onChange={handleChange} name="finalDestination" value={formData.finalDestination} />
                    <TextArea label="Marks & Nos./No. & Kind of Pkgs." onChange={handleChange} name="marksAndNumbers" value={formData.marksAndNumbers} />
                    <TextArea label="Description of Goods" onChange={handleChange} name="descriptionOfGoods" value={formData.descriptionOfGoods} />
                    <Field label="Quantity" type="number" onChange={handleChange} name="quantity" value={formData.quantity} />
                    <Field label="Net Weight" type="number" onChange={handleChange} name="netWeight" value={formData.netWeight} />
                    <Field label="Gross Weight" type="number" onChange={handleChange} name="grossWeight" value={formData.grossWeight} />
                    <TextArea label="Terms of Delivery and Payment" onChange={handleChange} name="termsOfDeliveryAndPayment" value={formData.termsOfDeliveryAndPayment} />

                    <div className="col-span-2 text-right mt-4">
                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
                    </div>
                </form>
            </div>
        </Card>
    );
}

function Field({ label, type, onChange, name, value }) {
    return (
        <div className="grid grid-cols-[150px_1fr] items-center gap-2">
            <span>{label}:</span>
            <CommonTextField
                type={type || 'text'}
                onChange={onChange}
                name={name}
                value={value}
            />
        </div>
    );
}

function TextArea({ label, onChange, name, value }) {
    return (
        <div className="grid grid-cols-[150px_1fr] gap-2">
            <span>{label}:</span>
            <CommonTextField
                type='textarea'
                onChange={onChange}
                name={name}
                value={value}
            />
        </div>
    );
}