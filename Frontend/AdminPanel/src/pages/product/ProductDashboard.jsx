import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "../../api/product.api.js";
import { SquarePen, Trash } from "lucide-react";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReadMore from "../blog/ReadMore.jsx";

function ProductDashboard() {
  const backendUrl = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
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
                  await deleteProduct({ id }).unwrap();
                  // setRows((prev) => prev.filter((row) => row._id !== id));
                  toast.success("Product deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete product");
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

  const productColumnConfig = {
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
    images: {
      label: "Images",
      render: (val) =>
        val?.length ? (
          <div className="flex gap-2 flex-wrap justify-center">
            {val.map((img, i) => (
              <img
                key={i}
                src={img?.public_url || `${backendUrl}/${img?.url}`}
                alt="product"
                className="h-10 w-10 object-cover rounded cursor-pointer"
                onClick={() =>
                  window.open(img?.public_url || `${backendUrl}/${img?.url}`, "_blank")
                }
              />
            ))}
          </div>
        ) : (
          "-"
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

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <>
        <PageHeader
          title="Product Dashboard"
          path="add"
          btnTitle="Add New Product"
        />
        <div className="text-red-600 text-sm py-20 text-center ">
          {error?.data?.message || error?.message}
        </div>
      </>
    );
  }

  return (
    <div>
      <PageHeader
        title="Product Dashboard"
        path="add"
        btnTitle="Add New Product"
      />
      <Table data={rows} columnConfig={productColumnConfig} />
    </div>
  );
}

export default ProductDashboard;
