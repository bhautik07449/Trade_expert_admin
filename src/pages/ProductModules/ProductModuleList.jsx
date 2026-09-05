import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CircleFadingPlus } from "lucide-react";
import CommonTable from "../../components/widgets/common_table";
import { getStatusStyles } from "../../lib/funcation";
import { formatDate } from "../../common/constants";
import { toast } from "../../components/ui/use-toast";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Edit, Plus } from "lucide-react";

import Investorservice from "../../service/investors.service";
import Supplierservice from "../../service/suppliers.service";
import Buyerservice from "../../service/buyer.service";
import Careerservice from "../../service/career.service";

const MODULE_CONFIG = {
  montile: {
    title: "Montile App Management",
    service: Investorservice,
    getList: (country) => Investorservice.getList(country),
    updateMethod: (id, body) => Investorservice.updateInvestor(id, body),
    deleteMethod: (id) => Investorservice.deleteInvestor(id),
    addMethod: (body) => Investorservice.addInvestor(body),
  },
  supplier: {
    title: "Supplier App Management",
    service: Supplierservice,
    getList: (country) => Supplierservice.getList(country),
    updateMethod: (id, body) => Supplierservice.updateSuppliers(body, id),
    deleteMethod: (id) => Supplierservice.deleteSupplier(id),
    addMethod: (body) => Supplierservice.addSuppliers(body),
  },
  client: {
    title: "Client App Management",
    service: Buyerservice,
    getList: (country) => Buyerservice.getList(country),
    updateMethod: (id, body) => Buyerservice.updateBuyer(id, body),
    deleteMethod: (id) => Buyerservice.deleteBuyer(id),
    addMethod: (body) => Buyerservice.updateBuyer(id, body),
  },
  service: {
    title: "Service App Management",
    service: Careerservice,
    getList: (country) => Careerservice.getList(country),
    updateMethod: (id, body) => Careerservice.updateCareer(id, body),
    deleteMethod: (id) => Careerservice.deleteCareer(id),
    addMethod: (body) => Careerservice.addCareer(body),
  },
};

const columns = [
  { field: "SrNo", headerName: "SrNo", flex: 1 },
  { field: "name", headerName: "Name", flex: 2 },
  { field: "email", headerName: "Email", flex: 2 },
  { field: "phone", headerName: "PhoneNo", flex: 1.5 },
  { field: "company_name", headerName: "Company / Details", flex: 2 },
  { field: "country", headerName: "Country", flex: 1 },
  {
    field: "status",
    headerName: "Status",
    flex: 1.2,
    renderCell: (params) => (
      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyles(params.value)}`}>
        {params.value || "active"}
      </span>
    ),
  },
  { field: "createdAtFormatted", headerName: "Created At", flex: 1.5 },
];

const ProductModuleList = ({ moduleKey = "montile" }) => {
  const config = MODULE_CONFIG[moduleKey] || MODULE_CONFIG.montile;
  const [list, setList] = useState([]);
  const [loader, setLoader] = useState(false);
  const selectedCountry = useSelector((state) => state.countryFilter.selectedCountry);

  // Modal states
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    companyName: "",
    country: "",
    status: "active",
  });

  const getList = async (country) => {
    setLoader(true);
    try {
      const res = await config.getList(country);
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
        title: config.title,
        description: error?.response?.data?.message || "Something went wrong",
      });
      setList([]);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getList(selectedCountry);
  }, [moduleKey, selectedCountry]);

  const handleDelete = async (row) => {
    const id = row?.id;
    if (!id) return;
    try {
      await config.deleteMethod(id);
      toast({
        variant: "success",
        title: config.title,
        description: "Deleted successfully.",
      });
      getList(selectedCountry);
    } catch (error) {
      toast({
        variant: "error",
        title: config.title,
        description: error?.response?.data?.message || "Delete failed",
      });
    }
  };

  const handleEdit = (row) => {
    setSelectedRow(row);
    const names = (row.name || "").split(" ");
    setFormData({
      firstName: row.firstName || row.first_name || names[0] || "",
      lastName: row.lastName || row.last_name || names.slice(1).join(" ") || "",
      email: row.email || "",
      phone: row.phone || "",
      companyName: row.company_name || "",
      country: row.country || "",
      status: row.status || "active",
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedRow) return;
    try {
      const payload = {
        firstName: formData.firstName,
        first_name: formData.firstName,
        lastName: formData.lastName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        contact: formData.phone,
        companyName: formData.companyName,
        company_name: formData.companyName,
        country: formData.country,
        status: formData.status,
      };

      await config.updateMethod(selectedRow.id, payload);
      toast({
        variant: "success",
        title: config.title,
        description: "Updated successfully.",
      });
      setEditModalOpen(false);
      getList(selectedCountry);
    } catch (error) {
      toast({
        variant: "error",
        title: config.title,
        description: error?.response?.data?.message || "Update failed.",
      });
    }
  };

  const handleAdd = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      companyName: "",
      country: "",
      status: "active",
    });
    setAddModalOpen(true);
  };

  const handleSaveAdd = async () => {
    try {
      const payload = {
        firstName: formData.firstName,
        first_name: formData.firstName,
        lastName: formData.lastName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        contact: formData.phone,
        companyName: formData.companyName,
        company_name: formData.companyName,
        country: formData.country,
        status: formData.status,
      };

      await config.addMethod(payload);
      toast({
        variant: "success",
        title: config.title,
        description: "Added successfully.",
      });
      setAddModalOpen(false);
      getList(selectedCountry);
    } catch (error) {
      toast({
        variant: "error",
        title: config.title,
        description: error?.response?.data?.message || "Add failed.",
      });
    }
  };

  return (
    <div className="grid gap-4 lg:gap-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="h4-bold">{config.title}</h3>
        <h4 className="h6-bold">Total: {list?.length || 0}</h4>
      </div>

      <Card className="p-4 grid gap-4 lg:gap-6">
        <div className="flex items-center justify-end gap-4">
          <div>
            <Button className="flex items-center gap-2" onClick={handleAdd}>
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

      {/* Edit Dialog */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-md bg-white p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Edit className="w-5 h-5 text-indigo-600" /> Edit Record
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold text-gray-700">First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-700">Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Email Address</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Phone Number</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Company / Details</Label>
              <Input
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Country</Label>
              <Input
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Access Status</Label>
              <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active / Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="revoked">Revoked / Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent className="max-w-md bg-white p-6 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Plus className="w-5 h-5 text-indigo-600" /> Add Record
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs font-semibold text-gray-700">First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold text-gray-700">Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Email Address</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Phone Number</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Company / Details</Label>
              <Input
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Country</Label>
              <Input
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-xs font-semibold text-gray-700">Access Status</Label>
              <Select value={formData.status} onValueChange={(val) => setFormData({ ...formData, status: val })}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active / Approved</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="revoked">Revoked / Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAdd} className="bg-indigo-600 hover:bg-indigo-700 text-white">
              Create Record
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductModuleList;
