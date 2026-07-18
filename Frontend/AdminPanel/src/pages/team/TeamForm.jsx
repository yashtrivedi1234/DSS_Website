import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  useTeamCreateMutation,
  useGetTeamByIdQuery,
  useTeamUpdateMutation,
} from "../../api/team.api";

import PageHeader from "../../components/PageHeader";
import Loader from "../../components/Loader";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  designation: yup.string(),
  department: yup.string(),
  description: yup.string(),
  image: yup.mixed().test("required", "Image is required", function (value) {
    if (this.parent.id && this.parent.existingImage) {
      return true;
    }
    return value && value.length > 0;
  }),
});

function TeamForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [existingImage, setExistingImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const { data: teamData, isLoading: teamLoading } = useGetTeamByIdQuery({id}, {
    skip: !id,
  });

  const [createTeam, { isLoading: createLoading }] = useTeamCreateMutation();
  const [updateTeam, { isLoading: updateLoading }] = useTeamUpdateMutation();

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
      name: "",
      designation: "",
      department: "",
      description: "",
      image: null,
    },
  });

  const watchedImage = watch("image");

  useEffect(() => {
    if (id && teamData?.data) {
      const { name, designation, department, description, image } =
        teamData.data;
      reset({
        name: name || "",
        designation: designation || "",
        department: department || "",
        description: description || "",
        image: image,
        id,
        existingImage: image,
      });

      setExistingImage(image || null);
    }
  }, [id, teamData, reset]);

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
      payload.append("name", formData.name);
      payload.append("designation", formData.designation);
      payload.append("department", formData.department);
      payload.append("description", formData.description);

      if (formData.image && formData.image.length > 0) {
        payload.append("image", formData.image[0]);
      }

      if (id) {
        await updateTeam({ id, formData: payload }).unwrap();
        toast.success("Team member updated successfully!");
      } else {
        await createTeam({ formData: payload }).unwrap();
        toast.success("Team member added successfully!");
      }

      navigate("/team");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save team member");
    }
  };

  if (teamLoading) return <Loader />;

  return (
    <div className="bg-gray-50 justify-center items-center">
      <PageHeader title={id ? "Update Team Member" : "Add New Team Member"} />

      <div className="w-full mx-auto border border-gray-200 rounded-2xl bg-white p-4">
        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4">
            {/* 3 Column Grid for Main Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black/80 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("name")}
                  required
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md   focus:ring-blue-500 transition-all duration-200"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Designation Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black/80 mb-1">
                  Designation
                </label>
                <input
                  type="text"
                  {...register("designation")}
                  placeholder="e.g. Senior Developer"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md   focus:ring-blue-500 transition-all duration-200"
                />
                {errors.designation && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.designation.message}
                  </p>
                )}
              </div>

              {/* Department Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-black/80 mb-1">
                  Department
                </label>
                <select
                  {...register("department")}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md   focus:ring-blue-500 transition-all duration-200 bg-white"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select department
                  </option>
                  <option value="Sales">Sales</option>
                  <option value="Design">Design</option>
                  <option value="Development">Production</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Operations">Operations</option>
                  <option value="Management">Management</option>
                  <option value="Other">Other</option>
                </select>
                {errors.department && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.department.message}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
           

              {/* Image Upload Section */}
              <div className="space-y-2 ">
                <label className="block text-sm font-medium text-black/80 mb-1">
                  Profile Image {!id && <span className="text-red-500">*</span>}
                </label>

                <input
                  type="file"
                  {...register("image")}
                  accept="image/*"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md   focus:ring-blue-500 transition-all duration-200 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
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
                      <p className="text-sm font-medium text-gray-700">
                        New Image Preview:
                      </p>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-2">
                        <img
                          src={imagePreview}
                          alt="New image preview"
                          className="w-full h-24 object-cover rounded-md"
                        />
                      </div>
                    </div>
                  )}

                  {/* Existing Image Display */}
                  {existingImage && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">
                        Current Image:
                      </p>
                      <div className="border-2 border-gray-200 rounded-lg p-2 bg-gray-50">
                        <img
                          src={
                            existingImage?.public_url ||
                            existingImage?.url ||
                            existingImage
                          }
                          alt="Current team member image"
                          className="w-full h-24 object-cover rounded-md"
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
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <div className="space-y-2">
                      {/* <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div> */}
                      <div>
                        <p className="text-sm text-gray-600">
                          Select a profile image
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG, WEBP up to 1MB
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

                 {/* Description Field - Full Width */}
              <div className="space-y-2 ">
                <label className="block text-sm font-medium text-black/80 mb-1">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  placeholder="Write a brief description about the team member..."
                  rows="4"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md   focus:ring-blue-500 transition-all duration-200 resize-vertical"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.description.message}
                  </p>
                )}
              </div>
            </div>
            {/* Submit Button */}
            <div className="  flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/team")}
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
                } px-6 py-2 bg-black text-white text-sm rounded-md   focus:ring-offset-2 focus:ring-gray-500 transform transition-all duration-200 shadow-lg`}
              >
                {createLoading || updateLoading
                  ? "Saving..."
                  : id
                  ? "Update Team Member"
                  : "Add Team Member"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeamForm;
