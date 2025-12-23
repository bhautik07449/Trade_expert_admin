import React from "react";
import { Card } from "../../components/ui/card";
import {
  Users,
  Tags,
  Package,
  FileSpreadsheet,
  PackageSearch,
  Globe,
} from "lucide-react";

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
    {
      title: "Total Buyers",
      value: 80,
      icon: Users,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Currencies",
      value: 12,
      icon: Globe,
      color: "bg-pink-100 text-pink-600",
    },
  ];

  return (
    <div className="grid gap-6">
      <h1 className="text-xl font-semibold capitalize text-gray-800">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="p-5 flex items-center justify-between rounded-xl 
                         hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col gap-1">
                <span className="text-sm text-gray-500">
                  {stat.title}
                </span>
                <span className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </span>
              </div>

              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;