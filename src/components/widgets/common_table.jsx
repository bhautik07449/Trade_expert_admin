"use client";

import { useMemo, useState, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import "ag-grid-community/styles/ag-theme-quartz.css";
import "../../App.css";

import { AiFillEdit } from "react-icons/ai";
import { Trash2 } from "lucide-react";

import Delete from "./common_Delete_dialog";
import CommonButton from "./common_button";

ModuleRegistry.registerModules([AllCommunityModule]);

// Beautiful shimmer skeleton component for loading state
const TableSkeleton = ({ columns, showEdit, showDelete, rowHeight }) => {
  const cols = columns && columns.length > 0 ? columns : [
    { headerName: "SrNo", flex: 1 },
    { headerName: "Name", flex: 2 },
    { headerName: "Details", flex: 3 },
    { headerName: "Status", flex: 1 },
    { headerName: "Created At", flex: 1 },
  ];

  const skeletonRows = Array(6).fill(0);

  return (
    <div className="w-full border border-gray-200 rounded-xl overflow-hidden bg-white dark:bg-[#1a1c1e] dark:border-gray-800 transition-all duration-300">
      {/* Table Header */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#25282c] py-3.5 px-4">
        {cols.map((col, index) => (
          <div
            key={index}
            style={{ flex: col.flex || 1, width: col.width }}
            className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pr-4"
          >
            {col.headerName ? (
              col.headerName
            ) : (
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-shimmer" />
            )}
          </div>
        ))}
        {(showEdit || showDelete) && (
          <div className="w-[120px] text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Actions
          </div>
        )}
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100 dark:divide-gray-800 animate-pulse">
        {skeletonRows.map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="flex items-center py-4 px-4 hover:bg-gray-50/50 dark:hover:bg-[#212428]/30 transition-colors duration-150"
            style={{ height: rowHeight }}
          >
            {cols.map((col, colIndex) => {
              // Varying widths for a more natural layout
              const widths = ["w-3/4", "w-1/2", "w-5/6", "w-2/3", "w-full"];
              const widthClass = widths[(rowIndex + colIndex) % widths.length];

              return (
                <div
                  key={colIndex}
                  style={{ flex: col.flex || 1, width: col.width }}
                  className="pr-4"
                >
                  <div className={`h-4 ${widthClass} bg-gray-200 dark:bg-gray-700 rounded animate-shimmer`} />
                </div>
              );
            })}
            {(showEdit || showDelete) && (
              <div className="w-[120px] flex gap-2">
                {showEdit && (
                  <div className="w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-700 animate-shimmer" />
                )}
                {showDelete && (
                  <div className="w-8 h-8 rounded-md bg-gray-200 dark:bg-gray-700 animate-shimmer" />
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CommonTable = ({
  columns = [],
  rows = [],
  showEdit = false,
  showDelete = false,
  onEdit = () => { },
  onDelete = () => { },
  rowHeight = 50,
  tableHeight = "400px",
  loading = false, // New explicit loading prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  // Auto-detect loading on initial mount if rows are empty (up to 1.5 seconds maximum)
  const [isTimeoutActive, setIsTimeoutActive] = useState(true);

  useEffect(() => {
    if (rows && rows.length > 0) {
      setIsTimeoutActive(false);
    }
  }, [rows]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTimeoutActive(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const activeLoading = loading || (rows.length === 0 && isTimeoutActive);

  const agColumns = useMemo(() => {
    const gridCols = columns.map((col) => ({
      headerName: col.headerName,
      field: col.field,
      flex: col.flex || 1,
      width: col.width,
      sortable: true,
      filter: true,
      cellRenderer: col.renderCell
        ? (params) =>
          col.renderCell({
            row: params.data,
            value: params.value,
          })
        : undefined,
    }));

    if (showEdit || showDelete) {
      gridCols.push({
        headerName: "Actions",
        width: 120,
        cellRenderer: (params) => (
          <div className="custom-actions">
            {showEdit && (
              <CommonButton
                variant="outline"
                className="size-8 rounded-md"
                onClick={() => onEdit(params.data)}
              >
                <AiFillEdit className="size-4" />
              </CommonButton>
            )}

            {showDelete && (
              <CommonButton
                variant="outline"
                className="size-8 rounded-md"
                onClick={() => {
                  setSelectedRow(params.data);
                  setIsOpen(true);
                }}
              >
                <Trash2 className="size-4" />
              </CommonButton>
            )}
          </div>
        ),
      });
    }

    return gridCols;
  }, [columns, showEdit, showDelete]);

  return (
    <>
      <div className="w-full" style={{ minHeight: tableHeight }}>
        {activeLoading ? (
          <TableSkeleton
            columns={columns}
            showEdit={showEdit}
            showDelete={showDelete}
            rowHeight={rowHeight}
          />
        ) : (
          <div className="ag-theme-quartz w-full"
            style={{
              height: tableHeight,
            }}>
            <AgGridReact
              rowData={rows}
              columnDefs={agColumns}
              rowHeight={rowHeight}
              pagination={true}
              paginationPageSize={10}
              paginationPageSizeSelector={[10, 20, 50, 100]}
              animateRows={true}
              rowSelection={{
                mode: "multiRow",
                enableClickSelection: true,
              }}
            />
          </div>
        )}
      </div>

      <Delete
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={() => onDelete(selectedRow?.id)}
      />
    </>
  );
};

export default CommonTable;