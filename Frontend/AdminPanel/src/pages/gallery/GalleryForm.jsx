import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useGetGalleryByIdQuery,
  useGalleryCreateMutation,
  useGalleryUpdateMutation,
} from "../../api/gallery.api";

import PageHeader from "../../components/PageHeader";
import Loader from "../../components/Loader";

const schema = yup.object().shape({
  category: yup.string().required("Category is required"),
  image: yup
    .mixed()
    .test("required", "Image is required", function (value) {
      // If we're updating and there's an existing image, we don't require a new one
      if (this.parent.id && this.parent.existingImage) {
        return true;
      }
      // For new entries, image is required
      return value && value.length > 0;
    }),
});

function GalleryForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [existingImage, setExistingImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data: galleryData, isLoading: galleryLoading } = useGetGalleryByIdQuery(
    { id },
    {
      skip: !id,
    }
  );

  const [createGallery, { isLoading: createLoading }] = useGalleryCreateMutation();
  const [updateGallery, { isLoading: updateLoading }] = useGalleryUpdateMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      category: "",
      image: null,
    },
  });

  const watchedImage = watch("image");

  useEffect(() => {
    if (id && galleryData?.data) {
      const { category, image } = galleryData.data;
      reset({
        category: category || "",
        image: image,
        id,
        existingImage: image,
      });

      setExistingImage(image || null);
    }
  }, [id, galleryData, reset]);

  // Handle image preview
  useEffect(() => {
    if (watchedImage && watchedImage.length > 0) {
      const file = watchedImage[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  }, [watchedImage]);

  const onSubmit = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("category", formData.category);
      
      if (formData.image && formData.image.length > 0) {
        payload.append("image", formData.image[0]);
      }

      if (id) {
        await updateGallery({ id, formData: payload }).unwrap();
        toast.success("Gallery item updated successfully!");
      } else {
        await createGallery({ formData: payload }).unwrap();
        toast.success("Gallery item created successfully!");
      }

      navigate("/gallery");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save gallery item");
    }
  };

  if (galleryLoading) return <Loader />;

  return (
    <div className="bg-gray-50 justify-center items-center">
      <PageHeader title={id ? "Update Gallery Item" : "Add New Gallery Item"} />

      <div className="w-full mx-auto  bg-white p-4">
        {/* Form Container */}
        <div className="bg-white  rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 ">
            <div className="max-w-2xl mx-auto space-y-3 border border-gray-200 rounded-2xl bg-white p-4">
              
              {/* Category Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black/80 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("category")}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200 bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="Outdoor Signage">Outdoor Signage</option>
                  <option value="Indoor Signage">Indoor Signage</option>
                  <option value="High Rise Signage">High Rise Signage</option>
                  <option value="Navigation Signage">Navigation Signage</option>
                  <option value="Retro Signage">Retro Signage</option>
                  <option value="Neon Signage">Neon Signage</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.category.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-black/80 mb-1">
                  Gallery Image {!id && <span className="text-red-500">*</span>}
                </label>
                
                <input
                  type="file"
                  {...register("image")}
                  accept="image/*"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all duration-200 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                />
                
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.image.message}
                  </p>
                )}

                {/* Image Preview Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  {/* New Image Preview */}
                  {imagePreview && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">New Image Preview:</p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-2">
                        <img
                          src={imagePreview}
                          alt="New image preview"
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                    </div>
                  )}

                  {/* Existing Image Display */}
                  {existingImage && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Current Image:</p>
                      <div className="border-2 border-gray-200 rounded-lg p-2 bg-gray-50">
                        <img
                          src={existingImage?.public_url || existingImage?.url || existingImage}
                          alt="Current gallery image"
                          className="w-full h-48 object-cover rounded-md"
                        />
                      </div>
                      {imagePreview && (
                        <p className="text-xs text-amber-600 flex items-center">
                          <span className="mr-1">ℹ</span>
                          This image will be replaced with the new one above
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Upload Instructions */}
                {!imagePreview && !existingImage && (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <div className="space-y-2">
                      <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Select an image file to upload</p>
                        <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/gallery")}
                  className="px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLoading || updateLoading}
                  className={`${
                    createLoading || updateLoading
                      ? "cursor-not-allowed opacity-70"
                      : "cursor-pointer hover:scale-105"
                  } px-6 py-2 bg-black text-white text-sm rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transform transition-all duration-200 shadow-lg`}
                >
                  {createLoading || updateLoading
                    ? "Saving..."
                    : id
                    ? "Update Gallery Item"
                    : "Add to Gallery"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GalleryForm;