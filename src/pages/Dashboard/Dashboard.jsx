import React from "react";
import { Card } from "../../components/ui/card";
import { ArrowUp, Users, ShoppingCart } from "lucide-react";

const Dashboard = () => {

    const stats = [
        {
            title: "Total Users",
            value: 1200,
            icon: <Users className="w-6 h-6 text-white" />,
            bgColor: "bg-blue-500",
        },
        {
            title: "New Orders",
            value: 75,
            icon: <ShoppingCart className="w-6 h-6 text-white" />,
            bgColor: "bg-green-500",
        },
        {
            title: "Revenue",
            value: "$12,450",
            icon: <ArrowUp className="w-6 h-6 text-white" />,
            bgColor: "bg-yellow-500",
        }
    ];

    return (
        <div className="grid gap-6">
            <h1 className="h4-bold capitalize">dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className={`p-4 flex items-center justify-between`}>
                        <div className="flex flex-col gap-1">
                            <p className="text-sm text-gray-500">{stat.title}</p>
                            <p className="text-xl font-bold">{stat.value}</p>
                        </div>
                        <div
                            className={`${stat.bgColor} w-12 h-12 flex items-center justify-center rounded-full`}
                        >
                            {stat.icon}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;