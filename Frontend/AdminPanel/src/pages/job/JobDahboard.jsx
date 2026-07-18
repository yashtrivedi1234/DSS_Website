import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import { useDeleteJobMutation, useGetAllJobsQuery } from "../../api/job.api.js"; // Removed: file deleted
import { Trash, FileText } from "lucide-react";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

function JobDashboard() {
  const { data, isLoading, isError, error } = useGetAllJobsQuery();
  const [deleteJob] = useDeleteJobMutation();
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
                  await deleteJob({ id }).unwrap();
                  // setRows((prev) => prev.filter((row) => row._id !== id));
                  toast.success("Job Application deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete application");
                }
                closeToast();
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

  const jobColumnConfig = {
    actions: {
      label: "Actions",
      render: (val, row) => (
        <div className="flex justify-center gap-3">
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
    fullName: { label: "Full Name" },
    email: { label: "Email" },
    phone: { label: "Phone" },
    jobProfile: { label: "Job Profile" },
    resume: {
      label: "Resume",
      render: (val) => {
        if (!val) return "No File";

        const fileUrl =
          `${import.meta.env.VITE_BACKEND}/${val.url}` || val.public_url;
        return fileUrl ? (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-blue-600 hover:underline"
          >
            <FileText size={16} /> View
          </a>
        ) : (
          "No File"
        );
      },
    },
    createdAt: {
      label: "Applied At",
      render: (val) => new Date(val).toLocaleString(),
    },
  };

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <>
        <PageHeader title="Job Applications Dashboard" />
        <div className="text-red-600 text-sm py-20 text-center">
          {error?.data?.message || error?.message}
        </div>
      </>
    );
  }

  return (
    <div>
      <PageHeader title="Job Applications Dashboard" />
      <Table data={rows} columnConfig={jobColumnConfig} />
    </div>
  );
}

export default JobDashboard;
