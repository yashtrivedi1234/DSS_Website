import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  useCreateClientMutation,
  useUpdateClientMutation,
  useGetClientByIdQuery,
} from "../../api/client.api";
import PageHeader from "../../components/PageHeader";
import Loader from "../../components/Loader";

const schema = yup.object().shape({
  name: yup.string().required("Client name is required"),
});

function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [existingImage, setExistingImage] = useState(null);

  const { data: clientData, isLoading: clientLoading } = useGetClientByIdQuery(
    id,
    {
      skip: !id,
    }
  );

  const [createClient, { isLoading: createLoading }] =
    useCreateClientMutation();
  const [updateClient, { isLoading: updateLoading }] =
    useUpdateClientMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      name: "",
      image: null,
    },
  });

  useEffect(() => {
    if (id && clientData?.data) {
      const { name, image } = clientData.data;

      reset({
        name: name || "",
        image: null,
      });

      setExistingImage(image || null);
    }
  }, [id, clientData, reset]);

  const onSubmit = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("name", formData.name);

      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }
      console.log("This is an payload", payload);

      if (id) {
        await updateClient({ id, formData: payload }).unwrap();
        toast.success("Client updated successfully!");
      } else {
        await createClient(payload).unwrap();
        toast.success("Client created successfully!");
        reset();
      }

      navigate("/client");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save client");
    }
  };

  if (clientLoading) return <Loader />;

  return (
    <div className="bg-gray-50 justify-center items-center">
      <PageHeader title={id ? "Update Client Details" : "Create New Client"} />

      <div className="w-full mx-auto border border-gray-200 rounded-2xl bg-white p-4">
        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <div className="md:grid grid-cols-12 gap-4 items-start">
              <div className="col-span-12 md:col-span-5 grid grid-cols-1 gap-3">
                {/* Client Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Client Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter client name"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div className={`${existingImage ? "flex" : "block"} gap-4`}>
                  <div className="">
                    <label className="block text-sm font-medium text-black/80 mb-1">
                      Client Logo
                    </label>
                    <input
                      type="file"
                      {...register("image")}
                      accept="image/*"
                      className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                    />
                  </div>
                  <div>
                    {/* Display existing image if available */}
                    {existingImage && (
                      <div className="">
                        <p className="block text-sm font-medium text-black/80 mb-1">
                          Current logo:
                        </p>
                        <img
                          src={existingImage?.public_url || existingImage?.url}
                          alt="Current client logo"
                          className="w-32 h-20 object-cover rounded border border-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Empty space for alignment */}
              <div className="col-span-12 md:col-span-7 space-y-2">
                <div className="h-full flex items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">
                      Client information form
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Fill in the required fields on the left
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-4 flex justify-end text-[14px]">
              <button
                type="submit"
                disabled={createLoading || updateLoading}
                className={`${
                  createLoading || updateLoading
                    ? "cursor-not-allowed opacity-70"
                    : "cursor-pointer"
                } px-4 py-1.5 bg-black rounded-sm text-white focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg`}
              >
                {createLoading || updateLoading
                  ? "Saving..."
                  : id
                  ? "Update Client"
                  : "Submit Client"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientForm;
