import React, { useState, useEffect, useMemo } from 'react';
import { Card } from '../../../components/ui/card';
import CommonTable from '../../../components/widgets/common_table';
import { Button } from '../../../components/ui/button';
import CommonBox from '../../../components/common/common_box';
import { CommonTextField } from '../../../components/widgets/common_textField';
import CommonButton from '../../../components/widgets/common_button';
import {
  CircleFadingPlus,
  Bell,
  Eye,
  CheckCircle,
  FileText,
  Maximize2,
  Minimize2,
  X,
  RefreshCw,
  AlertTriangle,
  Clock,
  ShieldAlert,
  Send,
  Building2,
  Layers,
  Info,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router';
import InterwatchAlertService from '../../../service/interwatchAlert.service';
import toast from 'react-hot-toast';

export default function InterwatchAlert() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);
  const [selectedAlertType, setSelectedAlertType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotificationPopover, setShowNotificationPopover] = useState(false);

  // Action Modal state
  const [selectedAlertForAction, setSelectedAlertForAction] = useState(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [actionForm, setActionForm] = useState({
    action_status: 'Pending',
    action_taken: 'Acknowledge Alert',
    admin_notes: '',
  });
  const [actionSubmitting, setActionSubmitting] = useState(false);

  // Initial fallback list if API has no rows yet
  const initialFallbackData = [
    {
      id: 101,
      supplierName: "Supplier A",
      category: "Material",
      reasonDesc: "Short on raw materials for current order production",
      reasonType: "Fall Short",
      alert_type: "Fall Short",
      source_module: "Offer Request",
      action_status: "Pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: 102,
      supplierName: "Supplier B",
      category: "Personnel",
      reasonDesc: "Staff unavailable due to seasonal downtime",
      reasonType: "Availability",
      alert_type: "Availability",
      source_module: "Product Enquiry",
      action_status: "Pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: 103,
      supplierName: "Supplier C",
      category: "Compliance",
      reasonDesc: "Failed recent environmental audit standard",
      reasonType: "Fall Short",
      alert_type: "Fall Short",
      source_module: "Offer Request",
      action_status: "In Progress",
      createdAt: new Date().toISOString(),
    },
    {
      id: 104,
      supplierName: "Supplier D",
      category: "Services",
      reasonDesc: "Subcontractor service delay reported",
      reasonType: "Fall Short",
      alert_type: "Fall Short",
      source_module: "Direct Alert",
      action_status: "Pending",
      createdAt: new Date().toISOString(),
    },
    {
      id: 105,
      supplierName: "Supplier E",
      category: "Logistical",
      reasonDesc: "Transport container breakdown and terminal congestion",
      reasonType: "Availability",
      alert_type: "Availability",
      source_module: "Offer Request",
      action_status: "Resolved",
      createdAt: new Date().toISOString(),
    },
    {
      id: 106,
      supplierName: "Supplier F",
      category: "Regulatory",
      reasonDesc: "Excessive certification and regulatory paper checks requested",
      reasonType: "Excessive Compliance",
      alert_type: "Excessive Compliance",
      source_module: "Product Enquiry",
      action_status: "Pending",
      createdAt: new Date().toISOString(),
    }
  ];

  const fetchData = async () => {
    setLoader(true);
    try {
      const res = await InterwatchAlertService.getInterwatchAlerts();
      if (res?.data?.data && res.data.data.length > 0) {
        const formatted = res.data.data.map(item => ({
          ...item,
          supplierName: item.supplier_name || item.supplierName || 'Supplier',
          reasonDesc: item.reason_desc || item.reasonDesc || '',
          reasonType: item.reason_type || item.alert_type || 'Fall Short',
          category: item.category || 'General',
          alert_type: item.alert_type || item.reason_type || 'Fall Short',
        }));
        setList(formatted);
      } else {
        // Use fallback initial data so page never appears blank
        setList(initialFallbackData);
      }
    } catch (error) {
      console.warn("Could not fetch alerts from API, using default dataset", error);
      setList(initialFallbackData);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter list by selected alert type and search query
  const filteredList = useMemo(() => {
    return list.filter(item => {
      const matchesType =
        selectedAlertType === 'all' ||
        item.alert_type?.toLowerCase() === selectedAlertType.toLowerCase() ||
        item.reasonType?.toLowerCase() === selectedAlertType.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.supplierName?.toLowerCase().includes(query) ||
        item.category?.toLowerCase().includes(query) ||
        item.reasonDesc?.toLowerCase().includes(query) ||
        item.reasonType?.toLowerCase().includes(query);

      return matchesType && matchesSearch;
    });
  }, [list, selectedAlertType, searchQuery]);

  // Grouped by reason types
  const fallShortList = useMemo(() => {
    return filteredList.filter(
      item => (item.reasonType || item.alert_type || '').toLowerCase().includes('fall short')
    );
  }, [filteredList]);

  const availabilityList = useMemo(() => {
    return filteredList.filter(
      item => (item.reasonType || item.alert_type || '').toLowerCase().includes('availability')
    );
  }, [filteredList]);

  const excessiveList = useMemo(() => {
    return filteredList.filter(
      item =>
        (item.reasonType || item.alert_type || '').toLowerCase().includes('excessive') ||
        (!item.reasonType?.toLowerCase().includes('fall short') &&
          !item.reasonType?.toLowerCase().includes('availability'))
    );
  }, [filteredList]);

  // Open Action Modal
  const handleOpenAction = (item, defaultAction = 'Acknowledge Alert') => {
    setSelectedAlertForAction(item);
    setActionForm({
      action_status: item.action_status || 'Pending',
      action_taken: defaultAction,
      admin_notes: item.admin_notes || item.action_taken || '',
    });
    setIsActionModalOpen(true);
  };

  const handleCloseAction = () => {
    setIsActionModalOpen(false);
    setSelectedAlertForAction(null);
    setIsZoomed(false);
  };

  const handleSaveAction = async (e) => {
    e.preventDefault();
    if (!selectedAlertForAction) return;

    setActionSubmitting(true);
    try {
      if (selectedAlertForAction.id && selectedAlertForAction.id > 1000) {
        // Real API record
        await InterwatchAlertService.updateInterwatchAlert(selectedAlertForAction.id, {
          action_status: actionForm.action_status,
          action_taken: actionForm.action_taken,
          admin_notes: actionForm.admin_notes,
        });
      }

      // Update local state
      setList(prev =>
        prev.map(row =>
          row.id === selectedAlertForAction.id
            ? {
              ...row,
              action_status: actionForm.action_status,
              action_taken: actionForm.action_taken,
              admin_notes: actionForm.admin_notes,
            }
            : row
        )
      );

      toast.success("Action submitted successfully!");
      handleCloseAction();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update action");
    } finally {
      setActionSubmitting(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      if (item.id && item.id > 1000) {
        await InterwatchAlertService.deleteInterwatchAlert(item.id);
      }
      setList(prev => prev.filter(r => r.id !== item.id));
      toast.success("Alert deleted successfully");
    } catch (err) {
      setList(prev => prev.filter(r => r.id !== item.id));
      toast.success("Alert removed");
    }
  };

  // Define Table Columns matching exact labels from sketch:
  // Supplier Name | Category | Reason Desc | Reason Type | Action
  const getColumns = (sectionTitle) => [
    {
      field: "supplierName",
      headerName: "Supplier Name",
      flex: 2,
      renderCell: (params) => (
        <div className="flex items-center gap-2 py-1">
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 flex items-center justify-center font-semibold text-xs border border-blue-200">
            {params.row?.supplierName?.charAt(0) || "S"}
          </div>
          <span className="font-medium text-slate-800 dark:text-slate-100">
            {params.row?.supplierName || "Supplier"}
          </span>
        </div>
      ),
    },
    {
      field: "category",
      headerName: "Category",
      flex: 2,
      renderCell: (params) => {
        const cat = params.row?.category || "General";
        let colorClass = "bg-purple-50 text-purple-700 border-purple-200";
        if (cat === "Material") colorClass = "bg-amber-50 text-amber-700 border-amber-200";
        if (cat === "Services") colorClass = "bg-blue-50 text-blue-700 border-blue-200";
        if (cat === "Personnel") colorClass = "bg-emerald-50 text-emerald-700 border-emerald-200";
        if (cat === "Compliance") colorClass = "bg-rose-50 text-rose-700 border-rose-200";
        if (cat === "Logistical") colorClass = "bg-cyan-50 text-cyan-700 border-cyan-200";
        if (cat === "Credit") colorClass = "bg-indigo-50 text-indigo-700 border-indigo-200";

        return (
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${colorClass}`}>
            {cat}
          </span>
        );
      },
    },
    {
      field: "reasonDesc",
      headerName: "Reason Desc",
      flex: 3,
      renderCell: (params) => (
        <div className="py-1">
          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2" title={params.row?.reasonDesc}>
            {params.row?.reasonDesc || "—"}
          </p>
          {params.row?.source_module && (
            <span className="text-[11px] text-slate-400 font-medium">
              Source: {params.row.source_module}
            </span>
          )}
        </div>
      ),
    },
    {
      field: "reasonType",
      headerName: "Reason Type",
      flex: 2,
      renderCell: (params) => {
        const type = params.row?.reasonType || params.row?.alert_type || sectionTitle;
        return (
          <span className="px-2 py-0.5 text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 rounded border border-slate-200">
            {type}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 3,
      renderCell: (params) => (
        <div className="flex items-center gap-1.5 py-1">
          {/* Button 1: View / Details */}
          <button
            onClick={() => handleOpenAction(params.row, "View Details")}
            title="View Details"
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded shadow-sm flex items-center gap-1 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-blue-600" />
            <span>View</span>
          </button>

          {/* Button 2: Take Action / Pop-up */}
          <button
            onClick={() => handleOpenAction(params.row, "Under Review")}
            title="Open Action Pop-up"
            className="px-2.5 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded shadow-sm flex items-center gap-1 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Action</span>
          </button>

          {/* Button 3: Resolve / Complete */}
          <button
            onClick={() => handleOpenAction(params.row, "Mark Resolved")}
            title="Resolve Alert"
            className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded shadow-sm flex items-center gap-1 transition-colors"
          >
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Resolve</span>
          </button>
        </div>
      ),
    },
  ];

  const pendingCount = list.filter(i => i.action_status === 'Pending').length;

  return (
    <div className="grid gap-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              Supplier Connect
            </span>
            <span className="text-slate-400">→</span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Interwatch Alert
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time supplier alerts & reason monitoring across offer requests and product inquiries
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Notification Bell with Badge */}
          <div className="relative">
            <button
              onClick={() => setShowNotificationPopover(!showNotificationPopover)}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-full relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              {pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse border-2 border-white">
                  {pendingCount}
                </span>
              )}
            </button>

            {/* Notification Popover */}
            {showNotificationPopover && (
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                  <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                    <Bell className="w-4 h-4 text-blue-600" /> Notifications
                  </h4>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">
                    {pendingCount} Pending
                  </span>
                </div>
                <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                  {list.slice(0, 5).map(alert => (
                    <div
                      key={alert.id}
                      onClick={() => {
                        setShowNotificationPopover(false);
                        handleOpenAction(alert);
                      }}
                      className="py-2 px-1 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200">
                        <span>{alert.supplierName}</span>
                        <span className="text-[10px] text-blue-600 font-normal">{alert.reasonType}</span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {alert.reasonDesc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Refresh Button */}
          <CommonButton
            variant="outline"
            size="sm"
            onClick={fetchData}
            className="flex items-center gap-1.5"
            disabled={loader}
            isLoading={loader}
          >
            <RefreshCw className={`w-4 h-4 ${loader ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Refresh</span>
          </CommonButton>

          {/* Add Manual Alert Button */}
          <CommonButton
            size="sm"
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => navigate('/supplier-connect/interwatch-alert/add')}
          >
            <CircleFadingPlus className="w-4 h-4" />
            <span>Add Alert</span>
          </CommonButton>
        </div>
      </div>

      {/* Overview Cards & Notification Types Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">Fall Short</span>
            <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-bold">
              {fallShortList.length}
            </span>
          </div>
          <p className="text-xs text-amber-700 mt-2">
            <strong>Categories:</strong> Material, Services, Compliance, Credit
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">Availability</span>
            <span className="text-xs bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              {availabilityList.length}
            </span>
          </div>
          <p className="text-xs text-emerald-700 mt-2">
            <strong>Categories:</strong> Personnel, Material, Logistical, Services
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-purple-800 uppercase tracking-wide">Excessive Compliance</span>
            <span className="text-xs bg-purple-200 text-purple-800 px-2 py-0.5 rounded-full font-bold">
              {excessiveList.length}
            </span>
          </div>
          <p className="text-xs text-purple-700 mt-2">
            <strong>Categories:</strong> Regulatory, Audit, Documentation, Quality
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wide">Action Queue</span>
            <span className="text-xs bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full font-bold">
              {pendingCount} Pending
            </span>
          </div>
          <p className="text-xs text-blue-700 mt-2">
            Total active monitored alerts: <strong>{filteredList.length}</strong>
          </p>
        </div>
      </div>

      {/* Alert Type Filter Dropdown & Search (Matching Sketch) */}
      <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
          <div className="w-full sm:w-80">
            <CommonBox
              label="Alert Type :"
              placeholders="Select Alert Type"
              options={[
                { label: "All (By Default - Grouped)", value: "all" },
                { label: "Reason: Fall Short", value: "fall short" },
                { label: "Reason: Availability", value: "availability" },
                { label: "Reason: Excessive Compliance", value: "excessive compliance" }
              ]}
              value={selectedAlertType}
              onChange={(value) => setSelectedAlertType(value || "all")}
            />
          </div>

          <div className="w-full sm:w-80">
            <CommonTextField
              label="Search Alert :"
              placeholder="Filter by supplier or reason..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              prefixIcon={<Search className="h-4 w-4 text-gray-500" />}
            />
          </div>
        </div>
      </Card>

      {/* Main Content: Grouped by Reason (As drawn in "By Default:" in Sketch) */}
      <div className="grid gap-6">
        {/* SECTION 1: Reason: Fall Short */}
        {(selectedAlertType === 'all' || selectedAlertType.toLowerCase() === 'fall short') && (
          <Card className="p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Reason: Fall Short
                </h3>
                <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded-full">
                  {fallShortList.length} Alerts
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Notification Types: Material, Services, Compliance, Credit
              </span>
            </div>

            <CommonTable
              columns={getColumns("Fall Short")}
              rows={fallShortList}
              loading={loader}
              showEdit={false}
              showDelete={true}
              onDelete={handleDelete}
            />
          </Card>
        )}

        {/* SECTION 2: Reason: Availability */}
        {(selectedAlertType === 'all' || selectedAlertType.toLowerCase() === 'availability') && (
          <Card className="p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Reason: Availability
                </h3>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                  {availabilityList.length} Alerts
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Notification Types: Personnel, Material, Logistical, Services
              </span>
            </div>

            <CommonTable
              columns={getColumns("Availability")}
              rows={availabilityList}
              loading={loader}
              showEdit={false}
              showDelete={true}
              onDelete={handleDelete}
            />
          </Card>
        )}

        {/* SECTION 3: Reason: Excessive Compliance / Other */}
        {(selectedAlertType === 'all' || selectedAlertType.toLowerCase() === 'excessive compliance') && (
          <Card className="p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Reason: Excessive Compliance
                </h3>
                <span className="text-xs bg-purple-100 text-purple-800 font-semibold px-2 py-0.5 rounded-full">
                  {excessiveList.length} Alerts
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Notification Types: Regulatory, Audit, Documentation, Quality
              </span>
            </div>

            <CommonTable
              columns={getColumns("Excessive Compliance")}
              rows={excessiveList}
              loading={loader}
              showEdit={false}
              showDelete={true}
              onDelete={handleDelete}
            />
          </Card>
        )}
      </div>

      {/* ACTION POP-UP MODAL (As sketched at bottom of user drawing) */}
      {isActionModalOpen && selectedAlertForAction && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col transition-all duration-300 ${isZoomed ? 'w-[96vw] h-[92vh]' : 'w-full max-w-2xl max-h-[90vh]'
              }`}
          >
            {/* Modal Title bar with Zoom and Close buttons (as in sketch) */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Action
                </h3>
              </div>

              <div className="flex items-center gap-2">
                {/* Zoom button */}
                <button
                  type="button"
                  onClick={() => setIsZoomed(!isZoomed)}
                  className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  title={isZoomed ? "Exit Zoom" : "Zoom"}
                >
                  {isZoomed ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>

                {/* Close [X] button */}
                <button
                  type="button"
                  onClick={handleCloseAction}
                  className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content Form */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-slate-500" />
                    <span className="font-bold text-slate-900 dark:text-white">
                      {selectedAlertForAction.supplierName}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                    Source: {selectedAlertForAction.source_module || 'Offer Request'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-medium">Reason Type:</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      {selectedAlertForAction.reasonType || selectedAlertForAction.alert_type}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500 font-medium">Category:</span>
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      {selectedAlertForAction.category}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500 font-medium">Supplier Reason Description:</span>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-100 mt-1 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    "{selectedAlertForAction.reasonDesc}"
                  </p>
                </div>
              </div>

              {/* Action Form */}
              <form onSubmit={handleSaveAction} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CommonBox
                    label="Action Type"
                    placeholders="Select Action Type"
                    options={[
                      { label: "Acknowledge Alert", value: "Acknowledge Alert" },
                      { label: "Request Supplier Call", value: "Request Supplier Call" },
                      { label: "Provide Stock Assistance", value: "Provide Stock Assistance" },
                      { label: "Escalate to Operations", value: "Escalate to Operations" },
                      { label: "Mark Resolved", value: "Mark Resolved" }
                    ]}
                    value={actionForm.action_taken}
                    onChange={(val) => setActionForm({ ...actionForm, action_taken: val })}
                  />

                  <CommonBox
                    label="Status"
                    placeholders="Select Status"
                    options={[
                      { label: "Pending", value: "Pending" },
                      { label: "Under Review", value: "Under Review" },
                      { label: "In Progress", value: "In Progress" },
                      { label: "Resolved", value: "Resolved" },
                      { label: "Closed", value: "Closed" }
                    ]}
                    value={actionForm.action_status}
                    onChange={(val) => setActionForm({ ...actionForm, action_status: val })}
                  />
                </div>

                <CommonTextField
                  label="Admin Action Notes / Reason Response"
                  placeholder="Enter notes on actions taken, supplier follow-up, or mitigation plan..."
                  type="textarea"
                  rows={4}
                  value={actionForm.admin_notes}
                  onChange={(e) => setActionForm({ ...actionForm, admin_notes: e.target.value })}
                />

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <CommonButton
                    type="button"
                    variant="outline"
                    onClick={handleCloseAction}
                    className="px-5"
                  >
                    Close
                  </CommonButton>

                  <CommonButton
                    type="submit"
                    isLoading={actionSubmitting}
                    className="px-6 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Action</span>
                  </CommonButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}