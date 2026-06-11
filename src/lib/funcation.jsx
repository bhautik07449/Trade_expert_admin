export const getStatusStyles = (status) => {
    if (status?.toLowerCase() === "active") {
        return "bg-green-100 text-green-600";
    } else {
        return "bg-red-100 text-red-600";
    }
};

export const getStatus = (status) => {
    if (status === "Indenting") return "bg-green-100 text-green-700";
    else if (status === "On-behalf") return "bg-yellow-100 text-yellow-700";
    else if (status === "Market-Development") return "bg-red-100 text-red-700";
    else return "bg-gray-100 text-gray-700";
};