import React, { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import {
  useDeleteGalleryMutation,
  useGetAllGalleryQuery,
} from "../../api/gallery.api";
import { SquarePen, Trash } from "lucide-react";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function GalleryDashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllGalleryQuery();
  const [deleteImage] = useDeleteGalleryMutation();
  const [rows, setRows] = useState([]);

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
                  await deleteImage({ id }).unwrap();
                  // setRows((prev) => prev.filter((row) => row._id !== id));
                  toast.success("Image deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete image");
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

  const handleEdit = (item) => {
    navigate(`update/${item?._id}`);
  };

  const imageColumnConfig = {
    actions: {
      label: "Actions",
      render: (val, row) => (
        <div className="flex justify-center gap-3">
          <button
            onClick={() => handleEdit(row)}
            className="text-orange-500 cursor-pointer"
            title="Edit"
          >
            <SquarePen size={20} />
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
    image: {
      label: "Image",
      render: (val) => (
        <img
          src={val?.public_url || `${backendUrl}/${val?.url}`}
          alt="gallery"
          className="h-14 w-14 object-cover rounded cursor-pointer"
          onClick={() =>
            window.open(val?.public_url || `${backendUrl}/${val?.url}`, "_blank")
          }
        />
      ),
    },
    category: { label: "Category" },
    createdAt: {
      label: "Created At",
      render: (val) => new Date(val).toLocaleString(),
    },
    updatedAt: {
      label: "Updated At",
      render: (val) => new Date(val).toLocaleString(),
    },
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <>
        <PageHeader title="Gallery Dashboard" path="add" btnTitle="Add New" />
        <div className="text-red-600 text-sm py-20 text-center">
          {console.log(error)}
          {error?.data?.message || error?.message}
        </div>
      </>
    );

  return (
    <div>
      <PageHeader title="Gallery Dashboard" path="add" btnTitle="Add New" />
      <Table data={rows} columnConfig={imageColumnConfig} />
    </div>
  );
}

export default GalleryDashboard;
