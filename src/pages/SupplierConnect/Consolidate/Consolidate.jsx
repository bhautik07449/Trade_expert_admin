import { useState } from 'react';
import { Card } from '../../../components/ui/card';
import CommonTable from '../../../components/widgets/common_table';
import { CircleFadingPlus } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { useNavigate } from 'react-router';

const columns = [
    { field: "supplierName", headerName: "Supplier Name" },
    { field: "category", headerName: "Category" },
    { field: "reasonDesc", headerName: "Reason Desc" },
    { field: "reasonType", headerName: "Reason Type" },
    { field: "notification", headerName: "Notification" }
];

export default function Consolidate() {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const [list, setList] = useState([
        {
            id: 1,
            supplierName: "Supplier A",
            category: "Material",
            reasonDesc: "Short on raw materials",
            reasonType: "Fall Short",
            notification: "Material"
        },
        {
            id: 2,
            supplierName: "Supplier B",
            category: "Personnel",
            reasonDesc: "Staff unavailable",
            reasonType: "Availability",
            notification: "Personnel"
        },
        {
            id: 3,
            supplierName: "Supplier C",
            category: "Compliance",
            reasonDesc: "Failed recent audit",
            reasonType: "Excessive",
            notification: "Compliance"
        },
        {
            id: 4,
            supplierName: "Supplier D",
            category: "Services",
            reasonDesc: "Service delay reported",
            reasonType: "Fall Short",
            notification: "Services"
        },
        {
            id: 5,
            supplierName: "Supplier E",
            category: "Logistical",
            reasonDesc: "Transport breakdown",
            reasonType: "Availability",
            notification: "Logistical"
        }
    ]);

    const handleDelete = (item) => {
        setList(list.filter(i => i.id !== item.id));
    }

    return (
        <div className="grid gap-4 lg:gap-6">
            <div className="flex items-center justify-between gap-2">
                <h3 className="h4-bold">Consolidate Alerts</h3>
                <h4 className="h6-bold">Total: {list?.length || 0}</h4>
            </div>

            <Card className="p-4 grid gap-4 lg:gap-6">
                <div className="flex items-center justify-end gap-4">
                    <div className="flex gap-3 items-center">
                        <Button className="flex items-center gap-2" onClick={() => navigate('/supplier-connect/consolidate/add')}>
                            <CircleFadingPlus className="size-5" />
                            <span className="max-lg:hidden uppercase"> Add</span>
                        </Button>
                    </div>
                </div>

                <CommonTable
                    columns={columns}
                    rows={list || []}
                    loading={loader}
                    showEdit={false}
                    showDelete={true}
                    onDelete={handleDelete}
                />
            </Card>
        </div>
    );
}