import { Button } from "../../../..//components/ui/button";
import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { CommonTextField } from "../../../..//components/widgets/common_textField";
import { CircleFadingPlus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import CommonFiltter from "../../../../components/widgets/common_filter";
import { getStatusStyles } from "../../../../lib/funcation";

const Currency = [
    { SrNo: 1, name: "JMD", image: "https://sourceseas.itcoders.in/img/no-image.png", description: "", status: "Active", Created: "14/11/2023" },
    { SrNo: 2, name: "INR", image: "https://sourceseas.itcoders.in/img/no-image.png", description: "", status: "Deactive", Created: "14/11/2023" },
    { SrNo: 3, name: "SGD", image: "https://sourceseas.itcoders.in/img/no-image.png", description: "", status: "Active", Created: "14/11/2023" },
    { SrNo: 4, name: "AED", image: "https://sourceseas.itcoders.in/img/no-image.png", description: "", status: "Deactive", Created: "14/11/2023" },
]

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
        field: "image", headerName: "Image", flex: 1,
        renderCell: ({ row }) => (
            <img
                src={row?.image}
                alt={row?.name}
                className="h-16 w-16 object-cover rounded p-0.5"
            />
        )
    },
    {
        field: "status", headerName: "Status", flex: 1, renderCell: (params) => (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(params.value)}`}>
                {params.value}
            </span>
        )
    },
    { field: "Created", headerName: "Created", flex: 1 },
]

export default function Gallery() {

    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    console.log("search", search);

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Galleries</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-between gap-4">
                    <div className="lg:max-w-72 w-full grid gap-1">
                        <CommonTextField
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search Galleries"
                            className="w-full"
                        />
                    </div>
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/gallery/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div>
                </div>

                <CommonTable
                    columns={columns}
                    rows={Currency || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={() => { }}
                    onDelete={() => { }}
                    rowHeight={80}
                />
            </Card>
        </div>
    );
}