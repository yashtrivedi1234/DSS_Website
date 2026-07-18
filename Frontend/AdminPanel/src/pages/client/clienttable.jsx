import React, { useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import Table from "../../components/Table";
import {
  useDeleteClientMutation,
  useGetAllClientsQuery,
} from "../../api/client.api";
import { SquarePen, Trash } from "lucide-react";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function ClientTable() {
  const backendUrl = import.meta.env.VITE_BACKEND;
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetAllClientsQuery();
  const [deleteClient] = useDeleteClientMutation();
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    if (data?.data?.data) {
      setRows(data.data.data);
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
                  await deleteClient(id).unwrap();
                  toast.success("Client deleted successfully");
                } catch (err) {
                  toast.error("Failed to delete client");
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

  const clientColumnConfig = {
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
    name: { label: "Client Name" },
    image: {
      label: "Logo",
      render: (val) => (
        <img
          src={val?.public_url || val?.url || `${backendUrl}/${val?.url}`}
          alt="client logo"
          className="h-10 w-10 object-cover rounded"
          onClick={() =>
            window.open(
              val?.public_url || val?.url || `${backendUrl}/${val?.url}`,
              "_blank"
            )
          }
        />
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
          title="Client Dashboard"
          path="add"
          btnTitle="Add New Client"
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
        title="Client Dashboard"
        path="add"
        btnTitle="Add New Client"
      />
      <Table
        key={rows && rows.length ? rows.map((r) => r._id).join("-") : "empty"}
        data={rows}
        columnConfig={clientColumnConfig}
      />
    </div>
  );
}

export default ClientTable;
