import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import { useDeleteBlogMutation, useGetAllBlogsQuery } from "../../api/blog.api";
import ReadMore from "./ReadMore";
import { SquarePen, Trash } from "lucide-react";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function BlogDashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
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
                  await deleteBlog({ id }).unwrap();
                  // setRows((prev) => prev.filter((row) => row._id !== id));
                  toast.success("Blog deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete blog");
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
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );
  };

  const handleEdit = (item) => {
    navigate(`update/${item?._id}`);
  };

  const blogColumnConfig = {
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
    title: { label: "Title" },
    description: {
      label: "Description",
      render: (val) => <ReadMore html={val} />,
    },

    image: {
      label: "Image",
      render: (val) => (
        <img
          src={val?.public_url || `${backendUrl}/${val?.url}`}
          alt="blog"
          className="h-10 w-10 object-cover rounded"
          onClick={() =>
            window.open(
              val?.public_url || `${backendUrl}/${val?.url}`,
              "_blank"
            )
          }
        />
      ),
    },
    category: {
      label: "Category",
    },
    tags: {
      label: "Tags",
      render: (val) =>
        val?.length ? (
          <div className="flex gap-1 flex-wrap justify-center">
            {val.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 text-xs rounded border"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : (
          "-"
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
        <PageHeader title="Blog Dashboard" path="add" btnTitle="Add New Blog" />
        <div className="text-red-600 text-sm py-20 text-center ">
          {error?.data?.message || error?.message}
        </div>
      </>
    );
  }
  return (
    <div>
      <PageHeader title="Blog Dashboard" path="add" btnTitle="Add New Blog" />
      <Table data={rows} columnConfig={blogColumnConfig} />
    </div>
  );
}

export default BlogDashboard;
