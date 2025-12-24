"use client";

import { useMemo, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

import "ag-grid-community/styles/ag-theme-quartz.css";
import "../../App.css";

import { AiFillEdit } from "react-icons/ai";
import { Trash2 } from "lucide-react";

import Delete from "./common_Delete_dialog";
import CommonButton from "./common_button";

ModuleRegistry.registerModules([AllCommunityModule]);


const CommonTable = ({
  columns = [],
  rows = [],
  showEdit = false,
  showDelete = false,
  onEdit = () => { },
  onDelete = () => { },
  rowHeight = 50
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

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
      <div className="ag-theme-quartz w-full"
        style={{
          height: "400px",
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

      <Delete
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleDelete={() => onDelete(selectedRow)}
      />
    </>
  );
};

export default CommonTable