import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Badge } from "../../components/ui/badge";
import { toast } from "../../components/ui/use-toast";
import { useSelector } from "react-redux";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search, 
  RefreshCw, 
  ShieldAlert, 
  Truck, 
  Users, 
  Briefcase, 
  TrendingUp,
  UserCheck,
  UserX
} from "lucide-react";

import Investorservice from "../../service/investors.service";
import Supplierservice from "../../service/suppliers.service";
import Buyerservice from "../../service/buyer.service";
import Careerservice from "../../service/career.service";
import { formatDate } from "../../common/constants";

const MODULES = [
  { key: "montile", label: "Montile App", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-200" },
  { key: "supplier", label: "Supplier App", icon: Truck, color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  { key: "client", label: "Client App", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-200" },
  { key: "service", label: "Service App", icon: Briefcase, color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
];

const ProductAppsAccess = () => {
  const [activeTab, setActiveTab] = useState("montile");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

  const fetchModuleData = async (moduleKey, country) => {
    setLoading(true);
    try {
      let res;
      if (moduleKey === "montile") {
        res = await Investorservice.getList(country);
      } else if (moduleKey === "supplier") {
        res = await Supplierservice.getList(country);
      } else if (moduleKey === "client") {
        res = await Buyerservice.getList(country);
      } else if (moduleKey === "service") {
        res = await Careerservice.getList(country);
      }

      let rawItems = [];
      if (Array.isArray(res?.data)) {
        rawItems = res.data;
      } else if (Array.isArray(res?.data?.data)) {
        rawItems = res.data.data;
      } else if (Array.isArray(res)) {
        rawItems = res;
      }

      const formatted = rawItems.map((item, idx) => ({
        id: item.id,
        name: item.name || (item.firstName || item.first_name || "") + " " + (item.lastName || item.last_name || ""),
        email: item.email || "N/A",
        phone: item.phone || item.contact || "N/A",
        company: item.companyName || item.company_name || item.work_interest || item.service_type || "N/A",
        country: item.country || "N/A",
        status: (item.status || "pending").toLowerCase(),
        createdAt: item.createdAt || item.created_at ? formatDate(item.createdAt || item.created_at) : "N/A",
        raw: item,
      }));

      setData(formatted);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error?.response?.data?.message || "Failed to load application users",
      });
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModuleData(activeTab, selectedCountry);
  }, [activeTab, selectedCountry]);

  const handleUpdateStatus = async (userId, newStatus) => {
    try {
      if (activeTab === "montile") {
        await Investorservice.updateInvestor(userId, { status: newStatus });
      } else if (activeTab === "supplier") {
        await Supplierservice.updateSupplier(userId, { status: newStatus });
      } else if (activeTab === "client") {
        await Buyerservice.updateBuyerStatus(userId, newStatus);
      } else if (activeTab === "service") {
        await Careerservice.updateCareer(userId, { status: newStatus });
      }

      toast({
        title: "Success",
        description: `Access status updated to '${newStatus.toUpperCase()}' successfully.`,
      });

      fetchModuleData(activeTab, selectedCountry);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: error?.response?.data?.message || "Could not update user access status",
      });
    }
  };

  const filteredData = data.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.company.toLowerCase().includes(search.toLowerCase());

    if (statusFilter === "PENDING") {
      return matchesSearch && user.status === "pending";
    }
    if (statusFilter === "ACTIVE") {
      return matchesSearch && (user.status === "active" || user.status === "approved");
    }
    if (statusFilter === "REVOKED") {
      return matchesSearch && (user.status === "revoked" || user.status === "blocked" || user.status === "block" || user.status === "inactive");
    }
    return matchesSearch;
  });

  const countPending = data.filter((u) => u.status === "pending").length;
  const countActive = data.filter((u) => u.status === "active" || u.status === "approved").length;
  const countRevoked = data.filter((u) => u.status === "revoked" || u.status === "blocked" || u.status === "block" || u.status === "inactive").length;

  const activeModuleObj = MODULES.find((m) => m.key === activeTab);

  return (
    <div className="p-6 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl border shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShieldAlert className="w-7 h-7 text-indigo-600" />
            Product Applications Access Control
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage admin access approvals and revoke permissions for 4 Product Apps (Montile, Supplier, Client, Service).
          </p>
        </div>

        <Button onClick={() => fetchModuleData(activeTab, selectedCountry)} variant="outline" className="flex items-center gap-2">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Module Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MODULES.map((mod) => {
          const Icon = mod.icon;
          const isSelected = activeTab === mod.key;
          return (
            <button
              key={mod.key}
              onClick={() => {
                setActiveTab(mod.key);
                setSearch("");
                setStatusFilter("ALL");
              }}
              className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? `${mod.bg} border-2 shadow-sm font-semibold`
                  : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
            >
              <div className={`p-3 rounded-lg ${isSelected ? "bg-white" : "bg-gray-100"}`}>
                <Icon className={`w-6 h-6 ${mod.color}`} />
              </div>
              <div>
                <div className="text-base font-medium">{mod.label}</div>
                <div className="text-xs text-gray-500">Access Management</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-gray-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">{data.length}</h3>
            </div>
            <Users className="w-8 h-8 text-gray-400 opacity-60" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-600 uppercase">Pending Approval</p>
              <h3 className="text-2xl font-bold text-amber-700 mt-1">{countPending}</h3>
            </div>
            <Clock className="w-8 h-8 text-amber-500 opacity-60" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-600 uppercase">Approved / Active</p>
              <h3 className="text-2xl font-bold text-emerald-700 mt-1">{countActive}</h3>
            </div>
            <CheckCircle className="w-8 h-8 text-emerald-500 opacity-60" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 shadow-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-red-600 uppercase">Access Revoked</p>
              <h3 className="text-2xl font-bold text-red-700 mt-1">{countRevoked}</h3>
            </div>
            <XCircle className="w-8 h-8 text-red-500 opacity-60" />
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="shadow-sm">
        <CardHeader className="bg-gray-50/50 border-b p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {activeModuleObj && <activeModuleObj.icon className={`w-5 h-5 ${activeModuleObj.color}`} />}
            {activeModuleObj?.label} - User Access Approvals
          </CardTitle>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                type="text"
                placeholder="Search name, email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-1 bg-white border p-1 rounded-lg">
              {["ALL", "PENDING", "ACTIVE", "REVOKED"].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
                    statusFilter === st
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="p-12 text-center text-gray-500">Loading user access list...</div>
          ) : filteredData.length === 0 ? (
            <div className="p-12 text-center text-gray-500">No application users found matching your filter criteria.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs uppercase bg-gray-100 text-gray-600 font-semibold border-b">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">User Name</th>
                    <th className="px-4 py-3">Email Address</th>
                    <th className="px-4 py-3">Phone</th>
                    <th className="px-4 py-3">Company / Details</th>
                    <th className="px-4 py-3">Country</th>
                    <th className="px-4 py-3">Registered Date</th>
                    <th className="px-4 py-3">Access Status</th>
                    <th className="px-4 py-3 text-center">Admin Approval Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredData.map((user, idx) => {
                    const isPending = user.status === "pending";
                    const isActive = user.status === "active" || user.status === "approved";
                    const isRevoked = user.status === "revoked" || user.status === "blocked" || user.status === "block" || user.status === "inactive";

                    return (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-500">{idx + 1}</td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{user.name}</td>
                        <td className="px-4 py-3 text-gray-600">{user.email}</td>
                        <td className="px-4 py-3 text-gray-600">{user.phone}</td>
                        <td className="px-4 py-3 text-gray-600">{user.company}</td>
                        <td className="px-4 py-3 text-gray-600">{user.country}</td>
                        <td className="px-4 py-3 text-gray-500 text-xs">{user.createdAt}</td>
                        <td className="px-4 py-3">
                          {isPending && (
                            <Badge className="bg-amber-100 text-amber-800 border-amber-300 font-medium px-2.5 py-0.5 flex items-center gap-1 w-fit">
                              <Clock className="w-3.5 h-3.5" /> Pending Approval
                            </Badge>
                          )}
                          {isActive && (
                            <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300 font-medium px-2.5 py-0.5 flex items-center gap-1 w-fit">
                              <CheckCircle className="w-3.5 h-3.5" /> Access Granted
                            </Badge>
                          )}
                          {isRevoked && (
                            <Badge className="bg-red-100 text-red-800 border-red-300 font-medium px-2.5 py-0.5 flex items-center gap-1 w-fit">
                              <XCircle className="w-3.5 h-3.5" /> Access Revoked
                            </Badge>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center justify-center gap-2">
                            {/* Approve Button */}
                            {!isActive && (
                              <Button
                                size="sm"
                                onClick={() => handleUpdateStatus(user.id, "active")}
                                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs h-8 flex items-center gap-1"
                              >
                                <UserCheck className="w-3.5 h-3.5" /> Approve Access
                              </Button>
                            )}

                            {/* Revoke Access Button */}
                            {!isRevoked && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleUpdateStatus(user.id, "revoked")}
                                className="bg-red-600 hover:bg-red-700 text-white text-xs h-8 flex items-center gap-1"
                              >
                                <UserX className="w-3.5 h-3.5" /> Revoke Access
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductAppsAccess;
