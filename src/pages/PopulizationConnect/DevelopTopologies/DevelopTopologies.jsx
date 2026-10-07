import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import CommonTable from '../../../components/widgets/common_table';
import React, { useEffect } from 'react';
import { CircleFadingPlus } from 'lucide-react';
import { useNavigate } from 'react-router';
import { toast } from '../../../components/ui/use-toast';
import { formatDate } from '../../../common/constants';
import DevelopTopologiesService from '../../../service/develop_topologies.service';
import { useDispatch, useSelector } from "react-redux";
import { fetchDevelopTopologies } from "../../../store/slice/developTopologiesSlice";

const columns = [
  { field: "SrNo", headerName: "SrNo", flex: 1 },
  { field: "prepositionName", headerName: "Preposition Name", flex: 2 },
  { field: "aim", headerName: "Aim", flex: 2 },
  { field: "candidateName", headerName: "Candidate Name", flex: 2 },
  { field: "candidateEmail", headerName: "Candidate Email", flex: 2 },
  { field: "createdAt", headerName: "Created At", flex: 2 }
];

export default function DevelopTopologies() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { list: topologies, loading: loader } = useSelector((state) => state.developTopologies);

  const getData = () => {
    dispatch(fetchDevelopTopologies());
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  const handleDelete = async (item) => {
    try {
      const res = await DevelopTopologiesService.deleteDevelopTopology(item);
      if (res?.data?.success || res?.status === 200) {
        toast({
          variant: "success",
          title: "Deleted",
          description: res?.data?.message || "Develop Topology deleted successfully"
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
    navigate(`/populization-connect/develop-topologies/edit/${row.id}`);
  };

  const formattedData = topologies ? topologies.map((item, index) => {
    return {
      ...item,
      SrNo: index + 1,
      prepositionName: item.preposition ? item.preposition.name : 'Unknown',
      aim: item.preposition ? item.preposition.aim : '-',
      candidateName: item.candidate ? item.candidate.name : 'Unknown',
      candidateEmail: item.candidate ? item.candidate.email : 'Unknown',
      createdAt: formatDate(item.createdAt)
    };
  }) : [];

  return (
    <div className="grid gap-4 lg:gap-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="h4-bold">Develop Topologies</h3>
        <h4 className="h6-bold">Total: {formattedData?.length || 0}</h4>
      </div>

      <Card className="p-4 grid gap-4 lg:gap-6">
        <div className="flex items-center justify-end gap-4">
          <div className="flex gap-3 items-center">
            <Button className="flex items-center gap-2" onClick={() => navigate('/populization-connect/develop-topologies/add')}>
              <CircleFadingPlus className="size-5" />
              <span className="max-lg:hidden uppercase"> Add</span>
            </Button>
          </div>
        </div>

        <CommonTable
          columns={columns}
          rows={formattedData}
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