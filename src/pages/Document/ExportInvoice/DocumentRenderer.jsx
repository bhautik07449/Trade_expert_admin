import { useParams } from "react-router-dom";
import Quotation from "../ExportInvoice/Forms/quotation";
import SampleInvoice from "../ExportInvoice/Forms/SampleInvoice";
import SalesContract from "./Forms/SalesContract";
import PerformaInvoice from "./Forms/PerformaInvoice";
import Packing from "./Forms/Packing";
import Drawback from "./Forms/Drawback";
import BillofLanding from "./Forms/BillofLanding";
import ShipmentAdvice from "./Forms/ShipmentAdvice";
import CoverLetterLc from "./Forms/CoverLetterLc";
import BillOfExchange from "./Forms/BillOfExchange";
import BillOfExchangeLC from "./Forms/BillOfExchangeLC";
import CommercialInvoice from "./Forms/CommercialInvoice";
import CommercialInvoiceCollection from "./Forms/CommercialInvoiceCollection";
import CommercialPacking from "./Forms/CommercialPacking";

const componentMap = {
    "quotation": Quotation,
    "sampling-sample-invoice": SampleInvoice,
    "sales-contracts": SalesContract,
    "letter-credit-draft": null, //not exit
    "preshipment-invoice": PerformaInvoice,
    "packing": Packing,
    "evd": null, //not working
    "drawback-declaration-letter": Drawback,
    "eway-bill": null, //not exit
    "bill-lading-draft": BillofLanding,
    "shipment-advice": ShipmentAdvice,
    "covering-letter-under-lc": CoverLetterLc, //Pending
    "covering-letter-under-collection": null, //Pending
    "bill-exchange-collection": BillOfExchange, //Pending
    "bill-exchange-lc": BillOfExchangeLC, //Pending
    "comercial-invoice-lc": CommercialInvoice,
    "comercial-invoice-collection": CommercialInvoiceCollection,
    "comercial-packing-list": CommercialPacking,
};

export default function DocumentRenderer() {
    const { formSlug } = useParams();

    const FormComponent = componentMap[formSlug];

    if (!FormComponent) {
        return <div>Form not found</div>;
    }

    return <FormComponent />;
}