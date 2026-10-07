import React, { useState } from 'react';
import { Card } from '../../../components/ui/card';
import CommonTable from '../../../components/widgets/common_table';
import { Button } from '../../../components/ui/button';
import { CircleFadingPlus } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function InterwatchAlert() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [list, setList] = useState([
    {
      id: 1,
      supplierName: "Supplier A",
      category: "Material",
      reasonDesc: "Short on raw materials",
      reasonType: "Fall short",
    },
    {
      id: 2,
      supplierName: "Supplier B",
      category: "Personnel",
      reasonDesc: "Staff unavailable",
      reasonType: "Availability",
    },
    {
      id: 3,
      supplierName: "Supplier C",
      category: "Compliance",
      reasonDesc: "Failed recent audit",
      reasonType: "Fall short",
    },
    {
      id: 4,
      supplierName: "Supplier D",
      category: "Services",
      reasonDesc: "Service delay reported",
      reasonType: "Fall short",
    },
    {
      id: 5,
      supplierName: "Supplier E",
      category: "Logistical",
      reasonDesc: "Transport breakdown",
      reasonType: "Availability",
    }
  ]);

  const columns = [
    { field: "supplierName", headerName: "Supplier Name", flex: 2 },
    { field: "category", headerName: "Category", flex: 2 },
    { field: "reasonDesc", headerName: "Reason Desc", flex: 3 },
    { field: "reasonType", headerName: "Reason Type", flex: 2 },
  ];

  const handleDelete = (item) => {
    const updatedList = list.filter((row) => row.id !== item.id);
    setList(updatedList);
  }

  return (
    <div className="grid gap-4 lg:gap-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="h4-bold">Supplier Connect → Interwatch Alert</h3>
        <h4 className="h6-bold">Total: {list?.length || 0}</h4>
      </div>

      <Card className="p-4 grid gap-4 lg:gap-6">
        <div className="flex items-center justify-end gap-4">
          <div className="flex gap-3 items-center">
            <Button className="flex items-center gap-2" onClick={() => navigate('/supplier-connect/interwatch-alert/add')}>
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