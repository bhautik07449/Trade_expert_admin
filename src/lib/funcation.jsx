export const getStatusStyles = (status) => {
    if (status?.toLowerCase() === "active") {
        return "bg-green-100 text-green-600";
    } else {
        return "bg-red-100 text-red-600";
    }
};