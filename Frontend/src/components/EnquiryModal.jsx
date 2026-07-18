import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Mail,
  Phone,
  User,
  Building,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react";
import * as Yup from "yup";

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const services = [
    "Recce Work",
    "Design Work",
    "Installation Work",
    "Annual Maintenance Contract (AMC)",
    "Consultancy Services",
  ];

  const enquirySchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters")
      .matches(/^[A-Za-z\s]+$/, "Name should contain only letters"),

    email: Yup.string().required("Email is required").email("Email is invalid"),

    phone: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),

    company: Yup.string()
      .nullable()
      .matches(/^[A-Za-z\s]+$/, "Company name should contain only letters"),

    service: Yup.string().required("Please select a service"),

    message: Yup.string().nullable(),
  });

  useEffect(() => {
    enquirySchema.isValid(formData).then((valid) => setIsFormValid(valid));
  }, [formData]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validateForm = async () => {
    try {
      await enquirySchema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Input sanitization for name, company, and phone fields
    if (name === "name" || name === "company") {
      // Allow only letters and spaces
      if (/^[A-Za-z\s]*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        if (errors[name]) {
          setErrors((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
      }
    } else if (name === "phone") {
      // Allow only digits
      if (/^\d*$/.test(value)) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
        if (errors[name]) {
          setErrors((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = await validateForm();
    if (!isValid) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
        setErrors({});
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "",
        message: "",
      });
      setErrors({});
      setIsSuccess(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-0 animate-fade-in"
      style={{ overflow: "auto" }}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/40 to-black/50 backdrop-blur-[2px]"
        onClick={handleClose}
      />

      {/* Modal - Scrollable Container */}
      <div className="relative w-full min-h-screen flex items-center justify-center p-3 sm:p-4 md:p-6">
        <div className="relative bg-slate-900/95 text-white rounded-lg sm:rounded-xl shadow-2xl w-full max-w-[500px] border border-white/10 backdrop-blur-xl animate-scale-in my-auto">
          {/* Close Button */}
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="absolute right-2 top-2 sm:right-3 sm:top-3 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-md"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </button>

          {/* Success State */}
          {isSuccess && (
            <div className="absolute inset-0 bg-slate-900 rounded-lg sm:rounded-xl flex items-center justify-center z-40 animate-fade-in">
              <div className="text-center px-4 py-6">
                <div className="mb-3 inline-block">
                  <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-500 animate-scale-in" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">
                  Thank You!
                </h3>
                <p className="text-sm text-white/70">
                  We'll get back to you shortly.
                </p>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-blue-500 px-4 py-3 sm:px-5 sm:py-4 rounded-t-lg sm:rounded-t-xl">
            <h2 className="text-lg sm:text-xl font-semibold text-white mb-0.5 pr-8">
              Send Inquiry
            </h2>
            <p className="text-white/90 text-xs sm:text-sm">
              We'll respond within 24 hours
            </p>
          </div>

          {/* Form */}
          <div className="p-4 sm:p-5">
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              {/* Name Field */}
              <div>
                <label className="flex items-center text-xs sm:text-sm font-medium text-white/90 mb-1.5">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-slate-400" />
                  Full Name <span className="text-red-400 ml-0.5">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    errors.name
                      ? "border-red-400 bg-red-50 text-slate-900"
                      : "border-white/20 bg-white/10 text-white placeholder:text-white/50"
                  }`}
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              {/* Email and Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email Field */}
                <div>
                  <label className="flex items-center text-xs sm:text-sm font-medium text-white/90 mb-1.5">
                    <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-slate-400" />
                    Email <span className="text-red-400 ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.email
                        ? "border-red-400 bg-red-50 text-slate-900"
                        : "border-white/20 bg-white/10 text-white placeholder:text-white/50"
                    }`}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div>
                  <label className="flex items-center text-xs sm:text-sm font-medium text-white/90 mb-1.5">
                    <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-slate-400" />
                    Phone <span className="text-red-400 ml-0.5">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.phone
                        ? "border-red-400 bg-red-50 text-slate-900"
                        : "border-white/20 bg-white/10 text-white placeholder:text-white/50"
                    }`}
                    placeholder="+91 98765 43210"
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Company Field */}
              <div>
                <label className="flex items-center text-xs sm:text-sm font-medium text-white/90 mb-1.5">
                  <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-slate-400" />
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm border border-white/20 bg-white/10 text-white placeholder:text-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Acme Corporation (optional)"
                  disabled={isSubmitting}
                />
              </div>

              {/* Service Selection */}
              <div>
                <label className="flex items-center text-xs sm:text-sm font-medium text-white/90 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-slate-400" />
                  Service Interest{" "}
                  <span className="text-red-400 ml-0.5">*</span>
                </label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                    errors.service
                      ? "border-red-400 bg-red-50 text-slate-900"
                      : "border-white/20 bg-white/10 text-white"
                  }`}
                  disabled={isSubmitting}
                >
                  <option value="" className="bg-slate-800">
                    Select a service
                  </option>
                  {services.map((service) => (
                    <option
                      key={service}
                      value={service}
                      className="bg-slate-800"
                    >
                      {service}
                    </option>
                  ))}
                </select>
                {errors.service && (
                  <p className="text-red-400 text-xs mt-1">{errors.service}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label className="flex items-center text-xs sm:text-sm font-medium text-white/90 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-slate-400" />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2 text-sm border border-white/20 bg-white/10 text-white placeholder:text-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                  placeholder="Tell us about your project..."
                  disabled={isSubmitting}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className="w-full py-2.5 bg-gradient-to-r from-green-500 to-blue-500 hover:opacity-90 text-white font-medium text-sm rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group shadow-lg hover:shadow-xl mt-4"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <Send className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default EnquiryModal;
