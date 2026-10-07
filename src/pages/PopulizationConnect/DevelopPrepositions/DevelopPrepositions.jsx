import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import CommonTable from '../../../components/widgets/common_table';
import React, { useEffect, useState } from 'react';
import { CircleFadingPlus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from '../../../components/ui/use-toast';
import { formatDate } from '../../../common/constants';
import DevelopPrepositionsService from '../../../service/develop_prepositions.service';

const columns = [
  { field: "SrNo", headerName: "SrNo", flex: 1 },
  { field: "belief", headerName: "Belief", flex: 2 },
  { field: "purpose", headerName: "Purpose", flex: 2 },
  { field: "goal", headerName: "Goal", flex: 2 },
  { field: "name", headerName: "Preposition Name", flex: 2 },
  { field: "aim", headerName: "Aim", flex: 2 },
  { field: "createdAt", headerName: "Created", flex: 2 }
];

export default function DevelopPrepositions() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);

  const getData = async () => {
    setLoader(true);
    try {
      const res = await DevelopPrepositionsService.getDevelopPrepositions();
      if (res?.data?.data) {
        const formattedData = res.data.data.map((item, index) => ({
          ...item,
          SrNo: index + 1,
          createdAt: formatDate(item.createdAt)
        }));
        setList(formattedData);
      }
    } catch (error) {
      toast({
        variant: "error",
        title: "Error",
        description: error?.response?.data?.message || "Failed to fetch data"
      });
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (item) => {
    try {
      const res = await DevelopPrepositionsService.deleteDevelopPreposition(item);

      if (res?.data?.success || res?.status === 200) {
        toast({
          title: "Deleted",
          description: res?.data?.message || "Develop Preposition deleted successfully",
          variant: "success"
        });
        getData();
      }
    } catch (error) {
      toast({
        variant: "error",
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong"
      });
    }
  };

  const handleEdit = (row) => {
    navigate(`/populization-connect/develop-prepositions/edit/${row.id}`);
  };

  return (
    <div className="grid gap-4 lg:gap-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="h4-bold">Develop Prepositions</h3>
        <h4 className="h6-bold">Total: {list?.length || 0}</h4>
      </div>

      <Card className="p-4 grid gap-4 lg:gap-6">
        <div className="flex items-center justify-end gap-4">
          <div className="flex gap-3 items-center">
            <Button className="flex items-center gap-2" onClick={() => navigate('/populization-connect/develop-prepositions/add')}>
              <CircleFadingPlus className="size-5" />
              <span className="max-lg:hidden uppercase"> Add</span>
            </Button>
          </div>
        </div>

        <CommonTable
          columns={columns}
          rows={list || []}
          loading={loader}
          showEdit={true}
          showDelete={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Card>
    </div>
  );
}