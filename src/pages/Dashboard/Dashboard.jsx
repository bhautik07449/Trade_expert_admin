import React from "react";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
    const { t } = useTranslation("common");

    return (
        <div className="grid gap-6">
            Dashboard
        </div>
    );
};

export default Dashboard;
