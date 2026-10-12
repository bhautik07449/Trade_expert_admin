import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/ui/card';
import { useNavigate, useParams } from 'react-router';
import { Bell, Send } from 'lucide-react';
import BackPath from '../../../components/common/BackPath';
import CommonBox from '../../../components/common/common_box';
import { CommonTextField } from '../../../components/widgets/common_textField';
import CommonButton from '../../../components/widgets/common_button';
import InterwatchAlertService from '../../../service/interwatchAlert.service';
import toast from 'react-hot-toast';

const CATEGORY_MAP = {
  'fall_short': ['Material', 'Services', 'Compliance', 'Credit'],
  'availability': ['Personnel', 'Material', 'Logistical', 'Services'],
  'excessive_compliance': ['Regulatory', 'Audit', 'Documentation', 'Inspection', 'Quality'],
};

const ALERT_TYPE_OPTIONS = [
  { label: 'Fall Short', value: 'fall_short' },
  { label: 'Availability', value: 'availability' },
  { label: 'Excessive Compliance', value: 'excessive_compliance' },
];

const SOURCE_MODULE_OPTIONS = [
  { label: 'Offer Request', value: 'Offer Request' },
  { label: 'Product Enquiry', value: 'Product Enquiry' },
  { label: 'Trade Offer', value: 'Trade Offer' },
  { label: 'Direct Alert', value: 'Direct Alert' },
];

export default function AddInterwatchAlert() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    supplier_name: '',
    alert_type: 'fall_short',
    category: 'Material',
    reason_desc: '',
    source_module: 'Direct Alert',
    action_status: 'Pending',
    admin_notes: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchAlert = async () => {
        try {
          const res = await InterwatchAlertService.getInterwatchAlertById(id);
          if (res?.data?.data) {
            const data = res.data.data;
            setFormData({
              supplier_name: data.supplier_name || '',
              alert_type: (data.alert_type || 'fall_short').toLowerCase().replace(' ', '_'),
              category: data.category || '',
              reason_desc: data.reason_desc || '',
              source_module: data.source_module || 'Direct Alert',
              action_status: data.action_status || 'Pending',
              admin_notes: data.admin_notes || '',
            });
          }
        } catch (err) {
          toast.error("Failed to load alert details");
        }
      };
      fetchAlert();
    }
  }, [id]);

  const handleAlertTypeChange = (selectedType) => {
    if (!selectedType) return;
    const availableCategories = CATEGORY_MAP[selectedType] || ['General'];
    setFormData(prev => ({
      ...prev,
      alert_type: selectedType,
      category: availableCategories[0] || 'General',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.supplier_name.trim()) {
      toast.error("Please enter a supplier name");
      return;
    }
    if (!formData.reason_desc.trim()) {
      toast.error("Please enter a reason description");
      return;
    }

    setLoading(true);
    try {
      const typeDisplay =
        formData.alert_type === 'fall_short'
          ? 'Fall Short'
          : formData.alert_type === 'availability'
          ? 'Availability'
          : 'Excessive Compliance';

      const payload = {
        ...formData,
        alert_type: typeDisplay,
        reason_type: typeDisplay,
      };

      if (id) {
        await InterwatchAlertService.updateInterwatchAlert(id, payload);
        toast.success("Alert updated successfully");
      } else {
        await InterwatchAlertService.addInterwatchAlert(payload);
        toast.success("Alert created successfully");
      }
      navigate('/supplier-connect/interwatch-alert');
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to save alert");
    } finally {
      setLoading(false);
    }
  };

  const categories = CATEGORY_MAP[formData.alert_type] || ['Material', 'Services', 'Compliance', 'Credit'];
  const categoryOptions = categories.map(cat => ({ label: cat, value: cat }));

  return (
    <div className="grid gap-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BackPath />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {id ? "Edit Interwatch Alert" : "Add Interwatch Alert"}
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-blue-200">
          <Bell className="w-4 h-4 text-blue-600" />
          <span>Supplier Connect Alert System</span>
        </div>
      </div>

      <Card className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Alert Type (CommonBox) */}
            <CommonBox
              label="Alert Type"
              placeholders="Select Alert Type"
              options={ALERT_TYPE_OPTIONS}
              value={formData.alert_type}
              onChange={handleAlertTypeChange}
            />

            {/* Category (CommonBox) */}
            <CommonBox
              label="Category"
              placeholders="Select Category"
              options={categoryOptions}
              value={formData.category}
              onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
            />

            {/* Supplier Name (CommonTextField) */}
            <CommonTextField
              label="Supplier Name"
              placeholder="e.g. Acme Textiles Ltd."
              name="supplier_name"
              value={formData.supplier_name}
              onChange={(e) => setFormData(prev => ({ ...prev, supplier_name: e.target.value }))}
              required
            />

            {/* Source Module (CommonBox) */}
            <CommonBox
              label="Source Module"
              placeholders="Select Source Module"
              options={SOURCE_MODULE_OPTIONS}
              value={formData.source_module}
              onChange={(value) => setFormData(prev => ({ ...prev, source_module: value }))}
            />
          </div>

          {/* Reason Description (CommonTextField as textarea) */}
          <CommonTextField
            label="Reason Description"
            placeholder="Describe the reason/issue entered by the supplier (e.g. Shortage on raw materials, staff downtime, delay)..."
            type="textarea"
            rows={4}
            name="reason_desc"
            value={formData.reason_desc}
            onChange={(e) => setFormData(prev => ({ ...prev, reason_desc: e.target.value }))}
            required
          />

          {/* Initial Admin Notes (CommonTextField as textarea) */}
          <CommonTextField
            label="Admin Notes / Action Response (Optional)"
            placeholder="Add optional notes on action or follow-up plan..."
            type="textarea"
            rows={3}
            name="admin_notes"
            value={formData.admin_notes}
            onChange={(e) => setFormData(prev => ({ ...prev, admin_notes: e.target.value }))}
          />

          {/* Action Buttons using CommonButton */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <CommonButton
              type="button"
              variant="outline"
              onClick={() => navigate('/supplier-connect/interwatch-alert')}
            >
              Cancel
            </CommonButton>

            <CommonButton
              type="submit"
              isLoading={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{id ? "Update Alert" : "Save Alert"}</span>
            </CommonButton>
          </div>
        </form>
      </Card>
    </div>
  );
}