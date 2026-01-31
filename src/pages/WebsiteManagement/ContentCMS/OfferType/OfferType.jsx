import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CommonTextField } from "../../../..//components/widgets/common_textField";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

const Offer_Type = [
    { SrNo: 1, name: "Whooping Trade Deals on Stock-lots", Created: "14/11/2023", Updated: "14/11/2023" },
    { SrNo: 2, name: "Whooping Trade Deals on Stock-lots", Created: "14/11/2023", Updated: "14/11/2023" },
    { SrNo: 3, name: "Whooping Trade Deals on Stock-lots", Created: "14/11/2023", Updated: "14/11/2023" },
    { SrNo: 4, name: "Whooping Trade Deals on Stock-lots", Created: "14/11/2023", Updated: "14/11/2023" },
]

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "Name", flex: 4 },
    { field: "Created", headerName: "Created", flex: 1 },
    { field: "Updated", headerName: "Updated", flex: 1 },
]

export default function OfferType() {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    console.log("search", search);

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Trade Types</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Trade Types"
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/offer-type/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div>
                </div>


                <CommonTable
                    columns={columns}
                    rows={Offer_Type || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={() => { }}
                    onDelete={() => { }}
                />
            </Card>
        </div>
    );
}