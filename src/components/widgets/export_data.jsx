import { FaFileExport } from "react-icons/fa6";
import CommonButton from "./common_button";
import * as XLSX from "xlsx";

export default function ExportData({ data, fileName = "data.xlsx" }) {

    const handleExportData = (rows, fileName) => {
        if (!rows || rows.length === 0) return;

        const worksheet = XLSX.utils.json_to_sheet(rows);

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Buyers");

        XLSX.writeFile(workbook, fileName);
    };

    return (
        <CommonButton
            variant="outline"
            size="sm"
            aria-label="Open Filters"
            onClick={() => handleExportData(data, fileName)}
        >
            <div className="flex items-center gap-2">
                <FaFileExport className="text-sm" />
                <span className="hidden md:inline">Export data</span>
            </div>
        </CommonButton>
    )
}