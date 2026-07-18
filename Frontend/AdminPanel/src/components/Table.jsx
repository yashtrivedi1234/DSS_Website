// src/components/DynamicTable.jsx
import React, { useEffect, useRef } from "react";
import $ from "jquery";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";

const Table = ({ data = [], columnConfig = {} }) => {
  const tableRef = useRef();
  const dataTableRef = useRef(null);

  useEffect(() => {
    // Destroy existing DataTable instance if it exists
    if (dataTableRef.current) {
      try {
        dataTableRef.current.destroy();
        dataTableRef.current = null;
      } catch (error) {
        console.warn("Error destroying DataTable:", error);
      }
    }

    // Only initialize DataTable if we have data and the table element exists
    if (data.length > 0 && tableRef.current) {
      try {
        dataTableRef.current = $(tableRef.current).DataTable({
          responsive: {
            details: {
              type: "column",
              target: "tr",
            },
          },
          columnDefs: [{ className: "control", orderable: true, targets: 0 }],
          scrollX: true,
          autoWidth: true,
          destroy: true,
          ordering: true,
          paging: true,
          info: true,
          language: {
            emptyTable: "No Records Found",
          },
          // Add this to prevent DataTables from caching DOM references
          deferRender: true,
        });
      } catch (error) {
        console.error("Error initializing DataTable:", error);
      }
    }

    // Cleanup function
    return () => {
      if (dataTableRef.current) {
        try {
          dataTableRef.current.destroy();
          dataTableRef.current = null;
        } catch (error) {
          console.warn("Error in cleanup:", error);
        }
      }
    };
  }, [data]); // Re-run when data changes

  if (!data.length) {
    return (
      <div className="text-center text-gray-500 text-sm py-6">
        No data available
      </div>
    );
  }

  const columns = Object.keys(columnConfig);
  
  return (
    <div className="w-full rounded-md overflow-x-auto p-2 border border-gray-200 bg-white shadow custom-table-wrapper">
      <table
        ref={tableRef}
        className="min-w-max w-full text-sm text-left dataTable display stripe hover"
      >
        <thead>
          <tr className="bg-black text-white">
            <th className="px-3 py-2 font-semibold text-xs uppercase text-center">
              S. No.
            </th>
            {columns.map((col) => (
              <th
                key={col}
                className="px-3 py-2 font-semibold text-xs uppercase text-center"
                style={{ whiteSpace: "nowrap" }}
              >
                {columnConfig[col]?.label || col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {data.map((row, idx) => (
            <tr
              key={row._id || idx} // Use unique ID if available
              className="border-b hover:bg-blue-50 transition-colors duration-200"
            >
              <td className="px-3 py-2 text-center">{idx + 1}</td>
              {columns.map((col) => (
                <td
                  key={col}
                  className="px-3 py-2 text-center"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {columnConfig[col]?.render
                    ? columnConfig[col].render(row[col], row)
                    : row[col] || "--"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;