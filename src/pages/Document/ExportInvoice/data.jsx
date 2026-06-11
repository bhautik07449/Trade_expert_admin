export function data() {
    return [
        {
            title: "Pre Shipment Documents",
            items: [
                {
                    label: "Expression of Interest", slug: "quotation", form: "Quotation" ,
                },
                {
                    label: "Sampling Sample Invoice", slug: "sampling-sample-invoice", form: "SampleInvoice"
                },
                {
                    label: "Sales Contract / Proforma Invoice", slug: "sales-contracts", form: "SalesContract"
                },
                {
                    label: "Letter of Credit Draft", slug: "letter-credit-draft", form: "LetterOfCreditDraft"
                },
            ]
        },
        {
            title: "Dispatch Documents",
            items: [
                {
                    label: "Preshipment Invoice", slug: "preshipment-invoice", form: "PreshipmentInvoice"
                },
                {
                    label: "Packing List", slug: "packing", form: "PackingList"
                },
                {
                    label: "EVD", slug: "evd", form: "EVD" 
                },
                {
                    label: "Drawback Declaration Letter", slug: "drawback-declaration-letter", form: "DrawbackDeclarationLetter"
                },
                {
                    label: "E-Way Bill", slug: "eway-bill", form: "EWB"
                }
            ]
        },
        {
            title: "Shipping Activity & Documents",
            items: [
                {
                    label: "Bill of Lading Draft", slug: "bill-lading-draft", form: "BillOfLadingDraft"
                }
            ]
        },
        {
            title: "POST - SHIPMENT PROCEDURE & DOCUMENTS",
            items: [
                {
                    label: "Shipment Advice", slug: "shipment-advice", form: "ShipmentAdvice"
                }
            ]
        },
        {
            title: "Documents Under Collection - Advance / CAD / DA / Open Account",
            items: [
                {
                    label: "Covering Letter For Post Shipment Under LC", slug: "covering-letter-under-lc", form: "CoveringLetterUnderLC"
                },
                {
                    label: "Covering Letter For Post Shipment Under Collection", slug: "covering-letter-under-collection", form: "CoveringLetterUnderCollection"
                },
            ]
        },
        {
            title: "New Bill of Exchange",
            items: [
                {
                    label: "Bill Of Exchange (Collection)", slug: "bill-exchange-collection", form: "BillOfExchangeCollection"
                },
                {
                    label: "Bill Of Exchange (LC)", slug: "bill-exchange-lc", form: "BillOfExchangeLC"
                },
                {
                    label: "Comercial Invoice (LC)", slug: "comercial-invoice-lc", form: "ComercialInvoiceLC"
                },
                {
                    label: "Comercial Invoice (Collection)", slug: "comercial-invoice-collection", form: "ComercialInvoiceCollection"
                },
                {
                    label: "Comercial Packing List", slug: "comercial-packing-list" , form: "ComercialPackingList"
                }
            ]
        }
    ]
}