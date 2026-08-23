export const getStatusStyles = (status) => {
    if (status?.toLowerCase() === "active") {
        return "bg-green-100 text-green-600";
    } else {
        return "bg-red-100 text-red-600";
    }
};

export const getStatus = (status) => {
    if (status === "Standalone") return "bg-blue-100 text-blue-700";
    else if (status === "Supervised") return "bg-yellow-100 text-yellow-700";
    else if (status === "Sectored") return "bg-purple-100 text-purple-700";
    else if (status === "Sovereign") return "bg-green-100 text-green-700";
    else if (status === "Composite") return "bg-green-100 text-green-700";
    else if (status === "Consolidated") return "bg-yellow-100 text-yellow-700";
    else if (status === "Controlled Alone") return "bg-red-100 text-red-700";
    else return "bg-gray-100 text-gray-700";
};