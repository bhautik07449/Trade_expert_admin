import React from "react";
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

const Dashboard = () => {
  const stats = [
    {
      title: "Total Categories",
      value: 54,
      icon: Tags,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Products",
      value: 20,
      icon: Package,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Quotations",
      value: 1,
      icon: FileSpreadsheet,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Sample Requests",
      value: 191,
      icon: PackageSearch,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  const productData = [
    { name: "Jan", products: 10 },
    { name: "Feb", products: 15 },
    { name: "Mar", products: 8 },
    { name: "Apr", products: 20 },
    { name: "May", products: 18 },
    { name: "Jun", products: 25 },
    { name: "Jul", products: 22 },
    { name: "Aug", products: 30 },
    { name: "Sep", products: 28 },
    { name: "Oct", products: 35 },
    { name: "Nov", products: 32 },
    { name: "Dec", products: 4 },
  ];

  const requestGrowth = [
    { name: "Jan", requests: 20 },
    { name: "Feb", requests: 35 },
    { name: "Mar", requests: 25 },
    { name: "Apr", requests: 45 },
    { name: "May", requests: 60 },
  ];

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
              className="p-5 flex items-center justify-between rounded-2xl 
                         shadow-sm hover:shadow-lg transition-all duration-300"
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