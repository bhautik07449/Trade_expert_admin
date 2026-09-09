import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { UserCheck, UserX, CheckCircle2, Clock, XCircle } from "lucide-react";
import CommonTable from "../../components/widgets/common_table";
import { formatDate } from "../../common/constants";
import { toast } from "../../components/ui/use-toast";
import { useSelector } from "react-redux";
import Investorservice from "../../service/investors.service";

export default function MontileModule() {
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);
  const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

  const getList = async (country) => {
    setLoader(true);
    try {
      const res = await Investorservice.getList(country);
      let rawItems = [];
      if (Array.isArray(res?.data)) {
        rawItems = res.data;
      } else if (Array.isArray(res?.data?.data)) {
        rawItems = res.data.data;
      } else if (Array.isArray(res)) {
        rawItems = res;
      }

      const formattedData = rawItems.map((item, index) => ({
        ...item,
        SrNo: index + 1,
        name: item.name || ((item.firstName || item.first_name || "") + " " + (item.lastName || item.last_name || "")).trim() || "N/A",
        phone: item.phone || item.contact || "N/A",
        company_name: item.companyName || item.company_name || item.work_interest || item.service_type || "N/A",
        status: item.status || "active",
        createdAtFormatted: item.createdAt || item.created_at ? formatDate(item.createdAt || item.created_at) : "N/A",
      }));

      setList(formattedData);
    } catch (error) {
      toast({
        variant: "error",
        title: "Montile App Management",
        description: error?.response?.data?.message || "Something went wrong",
      });
      setList([]);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getList(selectedCountry);
  }, [selectedCountry]);

  const handleToggleAccess = async (row) => {
    const val = (row.status || "active").toLowerCase();
    const isGranted = val === "active" || val === "approved";
    const newStatus = isGranted ? "revoked" : "active";
    try {
      await Investorservice.updateInvestor(row.id, { ...row, status: newStatus });
      toast({
        variant: "success",
        title: "Montile App Management",
        description: `Access ${isGranted ? "Revoked" : "Granted"} successfully for ${row.name}.`,
      });
      getList(selectedCountry);
    } catch (error) {
      toast({
        variant: "error",
        title: "Montile App Management",
        description: error?.response?.data?.message || "Failed to update access status.",
      });
    }
  };

  const columns = [
    { field: "SrNo", headerName: "#", flex: 0.5 },
    {
      field: "name",
      headerName: "USER NAME",
      flex: 1.8,
      renderCell: (params) => (
        <span className="font-bold">{params.value || "N/A"}</span>
      )
    },
    { field: "email", headerName: "EMAIL ADDRESS", flex: 2 },
    { field: "phone", headerName: "PHONE", flex: 1.3 },
    { field: "company_name", headerName: "COMPANY / DETAILS", flex: 2 },
    { field: "country", headerName: "COUNTRY", flex: 1 },
    { field: "createdAtFormatted", headerName: "REGISTERED DATE", flex: 1.5 },
    {
      field: "status",
      headerName: "ACCESS STATUS",
      flex: 1.8,
      renderCell: (params) => {
        const val = (params.value || "active").toLowerCase();
        if (val === "active" || val === "approved") {
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> Access Granted
            </span>
          );
        } else if (val === "pending") {
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Clock className="w-3.5 h-3.5 shrink-0" /> Pending Approval
            </span>
          );
        } else {
          return (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/15 text-rose-400 border border-rose-500/30">
              <XCircle className="w-3.5 h-3.5 shrink-0" /> Access Revoked
            </span>
          );
        }
      },
    },
    {
      field: "approvalActions",
      headerName: "ADMIN APPROVAL ACTIONS",
      flex: 2,
      renderCell: (params) => {
        const row = params.row;
        const val = (row?.status || "active").toLowerCase();
        const isGranted = val === "active" || val === "approved";

        if (isGranted) {
          return (
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shadow transition-colors"
              onClick={() => handleToggleAccess(row)}
            >
              <UserX className="w-3.5 h-3.5" /> Revoke Access
            </Button>
          );
        } else {
          return (
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-md shadow transition-colors"
              onClick={() => handleToggleAccess(row)}
            >
              <UserCheck className="w-3.5 h-3.5" /> Grant Access
            </Button>
          );
        }
      },
    },
  ];

  const handleDelete = async (rowOrId) => {
    const id = typeof rowOrId === "object" ? rowOrId?.id : rowOrId;
    if (!id) return;
    try {
      const res = await Investorservice.deleteInvestor(id);

      if (res) {
        toast({
          variant: "success",
          title: res?.data?.message || "Montile App Management",
          description: "Deleted successfully.",
        });
        getList(selectedCountry);
      }
    } catch (error) {
      toast({
        variant: "error",
        title: "Montile App Management",
        description: error?.response?.data?.message || "Delete failed",
      });
    }
  };

  return (
    <div className="grid gap-4 lg:gap-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="h4-bold">Montile App Management</h3>
        <h4 className="h6-bold">Total: {list?.length || 0}</h4>
      </div>

      <Card className="p-4 grid gap-4 lg:gap-6">
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
