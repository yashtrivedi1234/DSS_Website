import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import {
  useDeleteVisitorMutation,
  useGetAllVisitorQuery,
} from "../../api/visitor.api";
import { Trash } from "lucide-react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

function VisitorDashboard() {
  const { data, isLoading, isError, error , refetch } = useGetAllVisitorQuery();
  const [deleteVisitor] = useDeleteVisitorMutation();
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    if (data?.data) {
      setRows(data.data);
    }
  }, [data]);

const handleDelete = (item) => {
  const id = item?._id;

  toast(
    ({ closeToast }) => (
      <div>
        <p className="mb-2">Are you sure you want to delete?</p>
        <div className="flex gap-2">
          <button
            onClick={async () => {
              try {
                await deleteVisitor({ id }).unwrap();
                closeToast(); 
                 refetch();
                toast.success("Visitor deleted successfully"); 
              } catch (err) {
                closeToast();
                toast.error("Failed to delete visitor");
              }
            }}
            className="px-3 py-1 bg-orange-500 text-white rounded text-xs"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="px-3 py-1 bg-gray-300 text-xs rounded"
          >
            No
          </button>
        </div>
      </div>
    ),
    { autoClose: false, closeOnClick: false, draggable: false }
  );
};


  const visitorColumnConfig = {
    actions: {
      label: "Actions",
      render: (val, row) => (
        <div className="flex justify-center gap-3">
          <button
            onClick={() => handleDelete(row)}
            className="text-red-500 cursor-pointer"
            title="Delete"
          >
            <Trash size={20} />
          </button>
        </div>
      ),
    },
    visitorId: { label: "Visitor ID" },
    city: { label: "City" },
    ip: { label: "IP Address" },
    region: { label: "Region" },
    country: { label: "Country" },
    postal: { label: "Postal Code" },
    utmSource: { label: "UTM Source" },
    location: {
      label: "Location",
      render: (val) => `${val?.lat}, ${val?.long}`,
    },
    createdAt: {
      label: "Created At",
      render: (val) => new Date(val).toLocaleString(),
    },
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <>
        <PageHeader title="Visitor Dashboard" />
        <div className="text-red-600 text-sm py-20 text-center">
          {error?.data?.message || error?.message}
        </div>
      </>
    );
  }

  return (
    <div>
      <PageHeader title="Visitor Dashboard" />
      <Table data={rows} columnConfig={visitorColumnConfig} />
    </div>
  );
}

export default VisitorDashboard;
