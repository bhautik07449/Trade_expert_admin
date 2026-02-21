import { Card } from "../../../../components/ui/card";
import CommonTable from "../../../..//components/widgets/common_table";
import { Button } from "../../../../components/ui/button";
import { CircleFadingPlus } from "lucide-react";
import { useNavigate } from "react-router";
import { getStatusStyles } from "../../../../lib/funcation";

const banner = [
    { SrNo: 1, image: "https://sourceseas.itcoders.in/files/banners/7960166ccd6317f26ed02394c926fd71.jpeg", status: "Active", Created: "14/11/2023" },
    { SrNo: 2, image: "https://sourceseas.itcoders.in/files/banners/7960166ccd6317f26ed02394c926fd71.jpeg", status: "Deactive", Created: "14/11/2023" },
    { SrNo: 3, image: "https://sourceseas.itcoders.in/files/banners/7960166ccd6317f26ed02394c926fd71.jpeg", status: "Active", Created: "14/11/2023" },
    { SrNo: 4, image: "https://sourceseas.itcoders.in/files/banners/7960166ccd6317f26ed02394c926fd71.jpeg", status: "Deactive", Created: "14/11/2023" },
]

const columns = [
    { field: "SrNo", headerName: "SrNo", flex: 1 },
    {
        field: "image", headerName: "Image", flex: 5,
        renderCell: ({ row }) => (
            <img
                src={row?.image}
                alt={row?.name}
                className="h-52 w-[300px] object-fill rounded p-0.5"
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

export default function CertificationSliderManagement() {
    const navigate = useNavigate();

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Certification Slider Management</h3>
                <h4 className="h6-bold">Total: 12</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/website-management/content/certification-slider/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div>
                </div>
                <CommonTable
                    columns={columns}
                    rows={banner || []}
                    showEdit={true}
                    showDelete={true}
                    onEdit={() => { }}
                    onDelete={() => { }}
                    rowHeight={300}
                    tableHeight="600px"
                />
            </Card>
        </div>
    );
}