import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import {
  useGetProductByIdQuery,
  useProductCreateMutation,
  useProductUpdateMutation,
} from "../../api/product.api";

import PageHeader from "../../components/PageHeader";
import Loader from "../../components/Loader";

const schema = yup.object().shape({
  title: yup.string().required("Product title is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
  tags: yup
    .array()
    .of(yup.string().required())
    .min(1, "At least one tag is required"),
});

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tagInput, setTagInput] = useState("");
  const [existingImages, setExistingImages] = useState([]);

  const { data: productData, isLoading: productLoading } = useGetProductByIdQuery(
    { id },
    { skip: !id }
  );

  const [createProduct, { isLoading: createLoading }] = useProductCreateMutation();
  const [updateProduct, { isLoading: updateLoading }] = useProductUpdateMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: [],
      images: [],
    },
  });

  const watchedTags = watch("tags");

  // Populate form if editing
  useEffect(() => {
    if (id && productData?.data) {
      const { title, description, category, tags, images } = productData.data;
      reset({
        title: title || "",
        description: description || "",
        category: category || "",
        tags: tags || [],
        images: [],
      });
      setExistingImages(images || []);
    }
  }, [id, productData, reset]);

  const addTag = () => {
    if (tagInput.trim() && !watchedTags.includes(tagInput.trim())) {
      setValue("tags", [...watchedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setValue(
      "tags",
      watchedTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const onSubmit = async (formData) => {
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("category", formData.category);
      formData.tags.forEach((tag) => payload.append("tags", tag));

      if (formData.images?.length) {
        for (let i = 0; i < formData.images.length; i++) {
          payload.append("images", formData.images[i]);
        }
      }

      if (id) {
        await updateProduct({ id, formData: payload }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await createProduct({ formData: payload }).unwrap();
        toast.success("Product created successfully!");
      }

      navigate("/product");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save product");
    }
  };

  if (productLoading) return <Loader />;

  return (
    <div className="bg-gray-50 justify-center items-center">
      <PageHeader title={id ? "Update Product Details" : "Create New Product"} />

      <div className="w-full mx-auto border border-gray-200 rounded-2xl bg-white p-4">
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 ">
            <div className="md:grid grid-cols-12 gap-4 items-start">
              {/* LEFT PANEL */}
              <div className="col-span-12 md:col-span-5 grid grid-cols-1 gap-3">
                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("title")}
                    placeholder="Enter product title"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      ⚠ {errors.title.message}
                    </p>
                  )}
                </div>

                {/* Images Upload */}
                <div>
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Product Images
                  </label>
                  <input
                    type="file"
                    {...register("images")}
                    accept="image/*"
                    multiple
                    className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200 file:mr-3 file:py-1 file:px-2 file:rounded file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                  />
                  {existingImages?.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-3">
                      {existingImages.map((img, idx) => (
                        <img
                          key={idx}
                          src={img?.public_url || img?.url}
                          alt="Product"
                          className="w-20 h-16 object-cover rounded border border-gray-200"
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("category")}
                    className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200 bg-white"
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
                      ⚠ {errors.category.message}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Tags <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add tag"
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200"
                      onKeyDown={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-3 py-1.5 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors duration-200"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {watchedTags?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-800 text-sm rounded-md"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-gray-600 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  {errors.tags && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      ⚠ {errors.tags.message}
                    </p>
                  )}
                </div>
              </div>

              {/* RIGHT PANEL - Description */}
              <div className="col-span-12 md:col-span-7 space-y-2">
                <label className="block text-sm font-medium text-black/80 mb-1">
                  Product Description <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <div className="border border-gray-300 rounded-md overflow-hidden focus-within:border-transparent transition-all duration-200">
                      <SunEditor
                        key={productData?.data?.description}
                        setOptions={{
                          buttonList: [
                            ["undo", "redo"],
                            ["bold", "italic", "underline", "strike"],
                            ["fontColor", "hiliteColor", "fontSize", "formatBlock"],
                            ["paragraphStyle", "blockquote"],
                            ["removeFormat"],
                            ["outdent", "indent"],
                            ["align", "horizontalRule", "list", "lineHeight"],
                            ["table", "link", "image", "video"],
                            ["fullScreen", "showBlocks", "codeView"],
                            ["preview", "print"],
                          ],
                          defaultTag: "p",
                          minHeight: "200px",
                          showPathLabel: false,
                        }}
                        setContents={field.value || ""}
                        onChange={field.onChange}
                        height="200px"
                      />
                    </div>
                  )}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    ⚠ {errors.description.message}
                  </p>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-4 flex justify-end text-[14px]">
              <button
                type="submit"
                disabled={createLoading || updateLoading}
                className={`${
                  createLoading || updateLoading
                    ? "cursor-not-allowed opacity-70"
                    : "cursor-pointer"
                } px-4 py-1.5 bg-black rounded-sm text-white hover:scale-105 transition-all duration-200 shadow-lg`}
              >
                {createLoading || updateLoading
                  ? "Saving..."
                  : id
                  ? "Update Product"
                  : "Submit Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
