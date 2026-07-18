import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import {
  useDeleteSubscriberMutation,
  useGetAllsubscriberQuery,
  useToggleSubscriberStatusMutation,
} from "../../api/subscriber.api";
import { Trash, ToggleLeft, ToggleRight } from "lucide-react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

function SubscriberDashboard() {
  const { data, isLoading, isError, error } = useGetAllsubscriberQuery();
  const [deleteSubscriber] = useDeleteSubscriberMutation();
  const [toggleStatus] = useToggleSubscriberStatusMutation();
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    if (data?.data) {
      setRows(data.data);
    }
  }, [data]);
console.log(data)
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
                  await deleteSubscriber({ id }).unwrap();
                  // setRows((prev) => prev.filter((row) => row._id !== id));
                  toast.success("Subscriber deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete subscriber");
                }
                closeToast();
              }}
              className="px-3 py-1 bg-red-500 text-white rounded text-xs"
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

  const handleToggle = async (subscriber) => {
    try {
      const updated = await toggleStatus({
        id: subscriber._id,
        isActive: !subscriber.isActive,
      }).unwrap();

      setRows((prev) =>
        prev.map((row) =>
          row._id === subscriber._id ? { ...row, isActive: updated.isActive } : row
        )
      );
      toast.success("Status updated");
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const subscriberColumnConfig = {
    actions: {
      label: "Actions",
      render: (val, row) => (
        <div className="flex justify-center gap-4">
          <button
            onClick={() => handleToggle(row)}
            className="text-gray-800 cursor-pointer"
            title="Toggle Status"
          >
            {row.isActive ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
          </button>
          <button
            onClick={() => handleDelete(row)}
            className="text-orange-500 cursor-pointer"
            title="Delete"
          >
            <Trash size={20} />
          </button>
        </div>
      ),
    },
    email: { label: "Email" },
    isActive: {
      label: "Status",
      render: (val) => (
        <span
          className={`px-2 py-1 text-xs rounded ${
            val ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
          }`}
        >
          {val ? "Active" : "Inactive"}
        </span>
      ),
    },
    createdAt: {
      label: "Subscribed At",
      render: (val) => new Date(val).toLocaleString(),
    },
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <>
        <PageHeader title="Subscribers Dashboard" />
        <div className="text-red-600 text-sm py-20 text-center">
          {error?.data?.message || error?.message}
        </div>
      </>
    );
  }

  return (
    <div>
      <PageHeader title="Subscribers Dashboard" btnTitle="New Announcement" path="/subscriber/announcement" />
      <Table data={rows} columnConfig={subscriberColumnConfig} />
    </div>
  );
}

export default SubscriberDashboard;
