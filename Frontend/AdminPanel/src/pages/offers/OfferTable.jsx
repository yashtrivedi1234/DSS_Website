import React from "react";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import {
  useDeleteOfferMutation,
  useGetAllOffersQuery,
  useToggleOfferStatusMutation,
} from "../../api/offer.api";
import { SquarePen, Trash } from "lucide-react";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function OfferTable() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllOffersQuery();
  const [deleteOffer] = useDeleteOfferMutation();
  const [toggleOfferStatus] = useToggleOfferStatusMutation();

  const handleDelete = (item) => {
    const id = item?._id;
    toast(
      ({ closeToast }) => (
        <div>
          <p className="mb-2">Are you sure you want to delete this offer?</p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                try {
                  await deleteOffer(id).unwrap();
                  toast.success("Offer deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete offer");
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

  const handleToggleStatus = async (item) => {
    try {
      await toggleOfferStatus({
        id: item._id,
        isActive: !item.isActive,
      }).unwrap();
      toast.success(
        `Offer ${!item.isActive ? "activated" : "deactivated"} successfully`
      );
    } catch (err) {
      toast.error("Failed to update offer status");
    }
  };

  const offerColumnConfig = {
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
            className="text-red-500 cursor-pointer"
            title="Delete"
          >
            <Trash size={20} />
          </button>
        </div>
      ),
    },
    image: {
      label: "Image",
      render: (val) =>
        val?.public_url || val?.url ? (
          <img
            src={val?.public_url || val?.url}
            alt="offer image"
            className="h-12 w-12 object-cover rounded cursor-pointer"
            onClick={() => window.open(val?.public_url || val?.url, "_blank")}
          />
        ) : (
          <span className="text-gray-400 text-xs">No Image</span>
        ),
    },
    title: { label: "Offer Title" },
    description: {
      label: "Description",
      render: (val) => (
        <div className="max-w-xs truncate" title={val}>
          {val}
        </div>
      ),
    },
    discountType: {
      label: "Discount Type",
      render: (val) => (
        <span className="capitalize px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
          {val}
        </span>
      ),
    },
    discountValue: {
      label: "Discount",
      render: (val, row) => (
        <span className="font-semibold">
          {row.discountType === "percentage" ? `${val}%` : `₹${val}`}
        </span>
      ),
    },
    startDate: {
      label: "Start Date",
      render: (val) => new Date(val).toLocaleDateString(),
    },
    endDate: {
      label: "End Date",
      render: (val) => new Date(val).toLocaleDateString(),
    },
    isActive: {
      label: "Status",
      render: (val, row) => (
        <button
          onClick={() => handleToggleStatus(row)}
          className={`px-3 py-1 rounded text-xs font-medium cursor-pointer transition-colors ${
            val
              ? "bg-green-100 text-green-700 hover:bg-green-200"
              : "bg-red-100 text-red-700 hover:bg-red-200"
          }`}
        >
          {val ? "Active" : "Inactive"}
        </button>
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
          title="Offer Dashboard"
          path="add"
          btnTitle="Add New Offer"
        />
        <div className="text-red-600 text-sm py-20 text-center">
          {error?.data?.message || error?.message}
        </div>
      </>
    );
  }

  return (
    <div>
      <PageHeader title="Offer Dashboard" path="add" btnTitle="Add New Offer" />
      <Table
        key={(data?.data?.data || []).map((r) => r._id).join("-") || "empty"}
        data={data?.data?.data || []}
        columnConfig={offerColumnConfig}
      />
    </div>
  );
}

export default OfferTable;
