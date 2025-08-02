/* eslint-disable no-unused-vars */
import { useMutation } from "@tanstack/react-query";
import { createVenue } from "../../services/venueService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  PlusCircle,
  Building2,
  MapPin,
  Users,
  IndianRupee,
  User,
  ArrowLeft,
  Save,
  AlertCircle,
} from "lucide-react";

export default function AddVenueForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    location: "",
    capacity: "",
    pricePerHour: "",
    createdBy: "",
  });

  const { mutate, isLoading, error } = useMutation({
    mutationFn: createVenue,
    onSuccess: () => navigate("/admin/venues"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Apply validation based on field type
    if (name === "capacity") {
      // Only allow positive numbers up to 500
      const numValue = parseInt(value);
      if (value === "" || (numValue >= 0 && numValue <= 500)) {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "pricePerHour") {
      // Only allow positive numbers (including decimals)
      const numValue = parseFloat(value);
      if (value === "" || numValue >= 0) {
        setForm((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(form);
  };

  const formFields = [
    {
      name: "name",
      label: "Venue Name",
      placeholder: "Enter venue name",
      icon: Building2,
      description: "A unique and descriptive name for your venue",
    },
    {
      name: "location",
      label: "Location",
      placeholder: "Enter venue address or location",
      icon: MapPin,
      description: "Full address or location details",
    },
    {
      name: "capacity",
      label: "Capacity",
      type: "number",
      placeholder: "Maximum number of people (up to 500)",
      icon: Users,
      description:
        "Maximum number of people the venue can accommodate ( limit: 500 )",
      min: "0",
      max: "500",
    },
    {
      name: "pricePerHour",
      label: "Price per Hour",
      type: "number",
      placeholder: "Enter hourly rate",
      icon: IndianRupee,
      description: "Hourly rental cost in rupees",
      min: "0",
      step: "0.01",
    },
    {
      name: "createdBy",
      label: "Created By",
      placeholder: "Enter user ID or name",
      icon: User,
      description: "User responsible for creating this venue",
    },
  ];

  return (
    <div className="min-h-screen py-2">
      <div className="max-w-2xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/venues")}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Venues
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <PlusCircle className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Add New Venue</h1>
                <p className="text-blue-100 mt-1">
                  Create a new venue listing for your platform
                </p>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Fields */}
              {formFields.map(
                ({
                  name,
                  label,
                  type,
                  placeholder,
                  icon: Icon,
                  description,
                  min,
                  max,
                  step,
                }) => (
                  <div key={name} className="space-y-2">
                    <label
                      htmlFor={name}
                      className="block text-sm font-semibold text-gray-700"
                    >
                      {label}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Icon className="h-5 w-5 text-gray-600" />
                      </div>
                      <input
                        id={name}
                        name={name}
                        type={type || "text"}
                        placeholder={placeholder}
                        value={form[name]}
                        onChange={handleChange}
                        required
                        min={min}
                        max={max}
                        step={step}
                        className={`w-full pl-12 pr-4 py-3 border border-gray-400 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white ${
                          type === "number" ? "no-spinner" : ""
                        }`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{description}</p>
                  </div>
                ),
              )}

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-medium">
                      Failed to add venue
                    </p>
                    <p className="text-red-600 text-sm">
                      {error.response?.data?.error ||
                        "Please check your information and try again"}
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/admin/venues")}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Adding Venue...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Add Venue
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm">
            Make sure all information is accurate before submitting.
            <br />
            You can edit venue details later from the venue management page.
          </p>
        </div>
      </div>

      {/* Custom CSS to hide number input spinners */}
      <style jsx>{`
        .no-spinner::-webkit-outer-spin-button,
        .no-spinner::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        .no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
