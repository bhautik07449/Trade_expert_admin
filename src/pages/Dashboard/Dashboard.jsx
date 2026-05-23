import React, { useEffect, useState } from "react";
import { Card } from "../../components/ui/card";
import {
  Tags,
  Package,
  FileSpreadsheet,
  PackageSearch,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import Adminservice from "../../service/admin.service";
import { toast } from "../../components/ui/use-toast";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded-lg animate-shimmer mb-2" />
        <div className="h-4 w-96 bg-gray-100 dark:bg-gray-800 rounded-lg animate-shimmer" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array(4).fill(0).map((_, index) => (
          <div
            key={index}
            className="p-5 flex items-center justify-between rounded-2xl bg-white dark:bg-[#1a1c1e] border border-gray-100 dark:border-gray-800 shadow-sm"
          >
            <div className="flex flex-col gap-3 w-1/2">
              <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer" />
              <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded-md animate-shimmer" />
            </div>

            <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 animate-shimmer" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1c1e] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-shimmer" />
          <div className="h-72 flex items-end justify-between gap-2 pt-4 px-2">
            {[40, 70, 55, 90, 35, 60, 80, 50, 65, 85, 45, 75].map((height, i) => (
              <div
                key={i}
                style={{ height: `${height}%` }}
                className="w-full bg-gray-200 dark:bg-gray-700 rounded-t-md animate-shimmer"
              />
            ))}
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#1a1c1e] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="h-5 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-shimmer" />
          <div className="h-72 flex flex-col justify-between py-2 relative">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="w-full h-px bg-gray-100 dark:bg-gray-800" />
            ))}
            <div className="absolute inset-x-0 bottom-12 h-32 flex items-center justify-around px-4">
              {[20, 35, 25, 45, 30, 55, 40, 65, 50, 75, 60, 80].map((val, i) => (
                <div
                  key={i}
                  style={{ transform: `translateY(-${val}px)` }}
                  className="w-2.5 h-2.5 rounded-full bg-gray-300 dark:bg-gray-600 animate-shimmer"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loder, setLoder] = useState(false)

  const getUserData = async () => {
    setLoder(true);
    try {
      const res = await Adminservice.getDashboard();
      if (res) {
        setDashboardData(res?.data?.data);
        setLoder(false);
      }

    } catch (error) {
      toast({
        variant: "error",
        title: "Dashboard Data Fetch Failed",
        description: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoder(false);
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const stats = dashboardData
    ? [
      {
        title: "Total Categories",
        value: dashboardData.totalCategory,
        icon: Tags,
        color: "bg-blue-100 text-blue-600",
        border: "border-blue-500",
      },
      {
        title: "Total Products",
        value: dashboardData.monthlyProducts.reduce((a, b) => a + b, 0),
        icon: Package,
        color: "bg-green-100 text-green-600",
        border: "border-green-500",
      },
      {
        title: "Total Quotations",
        value: dashboardData.totalQuotation,
        icon: FileSpreadsheet,
        color: "bg-yellow-100 text-yellow-600",
        border: "border-yellow-500",
      },
      {
        title: "Sample Requests",
        value: dashboardData.totalRequest,
        icon: PackageSearch,
        color: "bg-purple-100 text-purple-600",
        border: "border-purple-500",
      },
    ]
    : [];

  const productData = dashboardData
    ? dashboardData.monthlyProducts.map((val, i) => ({
      name: months[i],
      products: val,
    }))
    : [];

  const requestGrowth = dashboardData
    ? dashboardData.sampleRequestGrowth.map((val, i) => ({
      name: months[i],
      requests: val,
    }))
    : [];

  if (loder || !dashboardData) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-sm text-gray-500">
          Monitor your business analytics and performance
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className={`p-5 flex items-center justify-between rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border-l-4 ${stat.border}`}
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">
                  {stat.title}
                </span>
                <span className="text-3xl font-bold text-gray-800">
                  {stat.value}
                </span>
              </div>

              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Monthly Products Added
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="products" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Sample Requests Growth
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={requestGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="requests"
                  stroke="#10b981"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;