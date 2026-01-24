import { useParams } from "react-router-dom";
import Quotation from "../ExportInvoice/Forms/quotation";
import SampleInvoice from "../ExportInvoice/Forms/SampleInvoice";
import SalesContract from "./Forms/SalesContract";
import PerformaInvoice from "./Forms/PerformaInvoice";
import Packing from "./Forms/Packing";
import Drawback from "./Forms/Drawback";

const componentMap = {
    "quotation": Quotation,
    "sampling-sample-invoice": SampleInvoice,
    "sales-contracts": SalesContract,
    "letter-credit-draft": null,
    "preshipment-invoice": PerformaInvoice,
    "packing": Packing,
    "evd": null,
    "drawback-declaration-letter": Drawback,
    "eway-bill": null,
};

export default function DocumentRenderer() {
    const { formSlug } = useParams();

    const FormComponent = componentMap[formSlug];

    if (!FormComponent) {
        return <div>Form not found</div>;
    }

    return <FormComponent />;
}