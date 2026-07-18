import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  useCreateOfferMutation,
  useUpdateOfferMutation,
  useGetOfferByIdQuery,
} from "../../api/offer.api";
import PageHeader from "../../components/PageHeader";
import Loader from "../../components/Loader";

const schema = yup.object().shape({
  title: yup.string().required("Offer title is required"),
  description: yup.string().required("Description is required"),
  discountType: yup
    .string()
    .oneOf(["percentage", "fixed"], "Invalid discount type")
    .required("Discount type is required"),
  discountValue: yup
    .number()
    .positive("Discount value must be positive")
    .required("Discount value is required")
    .test("max-percentage", "Percentage cannot exceed 100", function (value) {
      const { discountType } = this.parent;
      if (discountType === "percentage" && value > 100) {
        return false;
      }
      return true;
    }),
  startDate: yup
    .date()
    .required("Start date is required")
    .typeError("Invalid date format"),
  endDate: yup
    .date()
    .required("End date is required")
    .typeError("Invalid date format")
    .min(yup.ref("startDate"), "End date must be after start date"),
  isActive: yup.boolean(),
});

function OfferForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [existingImage, setExistingImage] = useState(null);

  const { data: offerData, isLoading: offerLoading } = useGetOfferByIdQuery(
    id,
    {
      skip: !id,
    }
  );

  const [createOffer, { isLoading: createLoading }] = useCreateOfferMutation();
  const [updateOffer, { isLoading: updateLoading }] = useUpdateOfferMutation();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      discountType: "percentage",
      discountValue: "",
      startDate: "",
      endDate: "",
      isActive: false,
      image: null,
    },
  });

  const discountType = watch("discountType");

  useEffect(() => {
    if (id && offerData?.data) {
      const {
        title,
        description,
        discountType,
        discountValue,
        startDate,
        endDate,
        isActive,
        image,
      } = offerData.data;

      reset({
        title: title || "",
        description: description || "",
        discountType: discountType || "percentage",
        discountValue: discountValue || "",
        startDate: startDate
          ? new Date(startDate).toISOString().split("T")[0]
          : "",
        endDate: endDate ? new Date(endDate).toISOString().split("T")[0] : "",
        isActive: isActive || false,
        image: null,
      });

      setExistingImage(image || null);
    }
  }, [id, offerData, reset]);

  const onSubmit = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("discountType", formData.discountType);
      payload.append("discountValue", formData.discountValue);
      payload.append("startDate", new Date(formData.startDate).toISOString());
      payload.append("endDate", new Date(formData.endDate).toISOString());
      payload.append("isActive", formData.isActive);

      if (formData.image?.[0]) {
        payload.append("image", formData.image[0]);
      }

      if (id) {
        await updateOffer({ id, formData: payload }).unwrap();
        toast.success("Offer updated successfully!");
      } else {
        await createOffer(payload).unwrap();
        toast.success("Offer created successfully!");
        reset();
        setExistingImage(null);
      }

      navigate("/offers");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save offer");
    }
  };

  if (offerLoading) return <Loader />;

  return (
    <div className="bg-gray-50 justify-center items-center">
      <PageHeader title={id ? "Update Offer Details" : "Create New Offer"} />

      <div className="w-full mx-auto border border-gray-200 rounded-2xl bg-white p-4">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            <div className="md:grid grid-cols-12 gap-4 items-start">
              <div className="col-span-12 md:col-span-6 grid grid-cols-1 gap-3">
                {/* Offer Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Offer Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="Enter offer title"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register("description")}
                    placeholder="Enter offer description"
                    rows={3}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.description.message}
                    </p>
                  )}
                </div>

                {/* Discount Type and Value */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black/80 mb-1">
                      Discount Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register("discountType")}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (₹)</option>
                    </select>
                    {errors.discountType && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.discountType.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black/80 mb-1">
                      Discount Value <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("discountValue")}
                      placeholder={
                        discountType === "percentage" ? "e.g., 20" : "e.g., 500"
                      }
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200"
                    />
                    {errors.discountValue && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.discountValue.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Start Date and End Date */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black/80 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("startDate")}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200"
                    />
                    {errors.startDate && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.startDate.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-black/80 mb-1">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      {...register("endDate")}
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200"
                    />
                    {errors.endDate && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <span className="mr-1">⚠</span>
                        {errors.endDate.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Offer Image
                  </label>
                  <input
                    type="file"
                    {...register("image")}
                    accept="image/*"
                    className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                </div>

                {/* Active Status */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register("isActive")}
                    id="isActive"
                    className="w-4 h-4 text-black border-gray-300 rounded focus:ring-2"
                  />
                  <label
                    htmlFor="isActive"
                    className="text-sm font-medium text-black/80"
                  >
                    Active Offer
                  </label>
                </div>
              </div>

              {/* Preview Section */}
              <div className="col-span-12 md:col-span-6 space-y-2">
                <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                  {existingImage ? (
                    <div className="text-center">
                      <p className="block text-sm font-medium text-black/80 mb-3">
                        Current Offer Image:
                      </p>
                      <img
                        src={existingImage?.public_url || existingImage?.url}
                        alt="Current offer image"
                        className="max-w-full h-48 object-contain rounded border border-gray-200 mx-auto"
                      />
                    </div>
                  ) : (
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
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      <p className="mt-2 text-sm text-gray-500">
                        Offer information form
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Fill in the required fields on the left
                      </p>
                    </div>
                  )}
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
                  ? "Update Offer"
                  : "Submit Offer"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OfferForm;
