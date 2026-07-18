import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import {
  useDeleteInquiryMutation,
  useGetAllInquiryQuery,
} from "../../api/inquiry.api";
import { SquarePen, Trash } from "lucide-react";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReadMore from "../blog/ReadMore";

function InquiryDashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllInquiryQuery();
  const [deleteInquiry] = useDeleteInquiryMutation();
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
                  await deleteInquiry({ id }).unwrap();
                  // setRows((prev) => prev.filter((row) => row._id !== id));
                  toast.success("Inquiry deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete inquiry");
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


  const inquiryColumnConfig = {
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
    name: { label: "Name" },
    email: { label: "Email" },
    phone: { label: "Phone" },
    companyName: { label: "Company" },
    requirement: {
      label: "Requirement",
      render: (val) => <ReadMore html={val} />,
    },
    message: {
      label: "Message",
      render: (val) => <ReadMore html={val} />,
    },
    sitePhotos: {
      label: "Site Photos",
      render: (val) => (
        <div className="flex gap-2 flex-wrap">
          {val?.map((file, i) => (
            <img
              key={i}
              src={file?.public_url || `${backendUrl}/${file?.url}`}
              alt="site"
              className="h-10 w-10 object-cover rounded cursor-pointer"
              onClick={() =>
                window.open(
                  file?.public_url || `${backendUrl}/${file?.url}`,
                  "_blank"
                )
              }
            />
          ))}
        </div>
      ),
    },
    createdAt: {
      label: "Created At",
      render: (val) => new Date(val).toLocaleString(),
    },
  };

  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return (
      <>
        <PageHeader
          title="Inquiry Dashboard"
        />
        <div className="text-red-600 text-sm py-20 text-center">
          {error?.data?.message || error?.message}
        </div>
      </>
    );
  }
  return (
    <div>
      <PageHeader title="Inquiry Dashboard"  />
      <Table data={rows} columnConfig={inquiryColumnConfig} />
    </div>
  );
}

export default InquiryDashboard;
