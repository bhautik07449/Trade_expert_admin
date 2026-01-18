import { useParams } from "react-router-dom";
import Quotation from "../ExportInvoice/Forms/quotation";
import SampleInvoice from "../ExportInvoice/Forms/SampleInvoice";

const componentMap = {
    "quotation": Quotation,
    "sampling-sample-invoice": SampleInvoice
};

export default function DocumentRenderer() {
    const { formSlug } = useParams();

    const FormComponent = componentMap[formSlug];

    if (!FormComponent) {
        return <div>Form not found</div>;
    }

    return <FormComponent />;
}