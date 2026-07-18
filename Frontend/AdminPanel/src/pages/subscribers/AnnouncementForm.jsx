import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import PageHeader from "../../components/PageHeader";
import { useAnnouncementMutation } from "../../api/auth.api";

const schema = yup.object().shape({
  subject: yup.string().required("Email subject is required"),
  subscriberStatus: yup.string().required("Subscriber status is required"),
  html: yup.string().required("Email content is required"),
});

function AnnouncementForm() {
  const navigate = useNavigate();
  const [subscriberCount, setSubscriberCount] = useState(0);

  const [sendAnnouncement, { isLoading: sendLoading }] = useAnnouncementMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      subject: "",
      subscriberStatus: "",
      html: "",
    },
  });


  const handleSendEmail = async (formData) => {
    try {
      const payload = {
        subject: formData.subject,
        subscriberStatus: formData.subscriberStatus,
        html: formData.html,
      };
      const resp = await sendAnnouncement({formData:payload}).unwrap();
      toast.success(`${resp?.message}`);
      reset();
      setSubscriberCount(0);
      
    } catch (err) {
      toast.error(err?.data?.message || "Failed to send announcement");
    }
  };

  return (
    <div className="bg-gray-50 justify-center items-center">
      <PageHeader title="Send Newsletter Announcement" />

      <div className="w-full mx-auto border border-gray-200 rounded-2xl bg-white p-4">
        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit(handleSendEmail)} className="p-4">
            <div className="md:grid grid-cols-1 gap-4 items-start">
              <div className=" grid grid-cols-2 gap-3">
                {/* Email Subject */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Email Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("subject")}
                    placeholder="Enter email subject"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Subscriber Status Dropdown */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-black/80 mb-1">
                    Send To Subscribers <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("subscriberStatus")}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 transition-all duration-200 bg-white"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select subscriber group
                    </option>
                    <option value="all">All Subscribers</option>
                    <option value="active">Active Subscribers</option>
                    <option value="inactive">Inactive Subscribers</option>
                  </select>
                  {errors.subscriberStatus && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <span className="mr-1">⚠</span>
                      {errors.subscriberStatus.message}
                    </p>
                  )}
                </div>

                
              </div>

              {/* Email Content - Full Width */}
              <div className=" space-y-2">
                <label className="block text-sm font-medium text-black/80 mb-1">
                  Email Content <span className="text-red-500">*</span>
                </label>
                <Controller
                  control={control}
                  name="html"
                  render={({ field }) => (
                    <div className="border border-gray-300 rounded-md overflow-hidden focus-within:border-transparent transition-all duration-200">
                      <SunEditor
                        setOptions={{
                          buttonList: [
                            ["undo", "redo"],
                            ["bold", "italic", "underline", "strike"],
                            [
                              "fontColor",
                              "hiliteColor",
                              "fontSize",
                              "formatBlock",
                            ],
                            ["paragraphStyle", "blockquote"],
                            ["removeFormat"],
                            ["outdent", "indent"],
                            ["align", "horizontalRule", "list", "lineHeight"],
                            ["table", "link", "image", "video"],
                            ["fullScreen", "showBlocks", "codeView"],
                            ["preview", "print"],
                          ],
                          defaultTag: "p",
                          minHeight: "250px",
                          showPathLabel: false,
                          font: [
                            "Arial",
                            "Helvetica",
                            "sans-serif",
                            "serif",
                            "monospace",
                          ],
                          placeholder: "Write your newsletter content here...",
                        }}
                        setContents={field.value || ""} 
                        onChange={field.onChange}
                        height="250px"
                      />
                    </div>
                  )}
                />
                {errors.html && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <span className="mr-1">⚠</span>
                    {errors.html.message}
                  </p>
                )}
              </div>
            </div>

            {/* Send Button */}
            <div className="mt-4 flex justify-end text-[14px]">
              <button
                type="submit"
                disabled={sendLoading}
                className={`${
                  sendLoading
                    ? "cursor-not-allowed opacity-70"
                    : "cursor-pointer"
                } px-6 py-2 bg-black hover:bg-gray-950 rounded-md text-white focus:ring-offset-2 transform hover:scale-105 transition-all duration-200 shadow-lg`}
              >
                {sendLoading
                  ? "Sending Email..."
                  : `Send to Subscribers`}
              </button>
            </div>

           
          </form>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementForm;