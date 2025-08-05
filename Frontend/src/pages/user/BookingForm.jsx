import { useMutation, useQuery } from "@tanstack/react-query";
import { createBooking } from "../../services/bookingService";
import { useParams, useNavigate } from "react-router-dom";
import { getVenueById } from "../../services/venueService";
import { useState } from "react";
import {
  User,
  Mail,
  CalendarDays,
  Clock,
  Loader2,
  AlertCircle,
  ArrowLeft,
  CreditCard,
  Building2,
} from "lucide-react";

// ============ BOOKING FORM COMPONENT ============
// Handles venue booking with form validation and real-time price calculation
export default function BookingForm() {
  // ===== ROUTE PARAMETERS & NAVIGATION =====
  const { venueId } = useParams(); // Extract venue ID from URL parameters
  const navigate = useNavigate(); // For programmatic navigation

  // ===== FORM STATE MANAGEMENT =====
  // Centralized form state with default values
  const [form, setForm] = useState({
    userName: "",
    userEmail: "",
    bookingDate: "",
    hoursBooked: 1, // Default to 1 hour minimum
  });

  // ===== BOOKING MUTATION =====
  // Handle booking submission with success/error states
  const mutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (response) => {
      console.log("Booking successful:", response);
      // Navigate to confirmation page on success
      navigate(`/book/${venueId}/confirm`);
    },
    onError: (error) => {
      console.error("Booking failed:", error);
      // Error handling is managed through mutation.error in UI
    },
  });

  // ===== VENUE DATA FETCHING =====
  // Fetch venue details for booking form context
  const {
    data,
    isLoading: venueLoading,
    error: venueError,
  } = useQuery({
    queryKey: ["venue", venueId],
    queryFn: () => getVenueById(venueId),
    enabled: !!venueId, // Only run query if venueId exists
  });

  // ===== FORM HANDLERS =====
  // Handle form input changes with controlled components
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "hoursBooked" ? parseInt(value) || 1 : value, // Ensure hoursBooked is always a number
    }));
  };

  // Handle form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!form.userName.trim() || !form.userEmail.trim() || !form.bookingDate) {
      return; // Form validation will show required field errors
    }

    // Submit booking with parsed venueId
    mutation.mutate({
      ...form,
      venueId: parseInt(venueId),
      hoursBooked: parseInt(form.hoursBooked) || 1, // Ensure it's a valid number
    });
  };

  // ===== COMPUTED VALUES =====
  // Safe venue data access with fallback
  const venue = data?.data || {};

  // Calculate total price with fallback handling
  const pricePerHour = venue.pricePerHour || 0;
  const estimatedPrice = (form.hoursBooked || 1) * pricePerHour;

  // ===== LOADING STATE =====
  // Show loading spinner while venue data is being fetched
  if (venueLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
        <p className="mt-4 text-gray-600 font-medium">
          Loading Booking Form...
        </p>
      </div>
    );
  }

  // ===== ERROR STATE =====
  // Handle venue loading errors with user-friendly options
  if (venueError || !venue.name) {
    // Check for venue.name instead of just venue
    return (
      <div className="min-h-[80vh]">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-sm mx-4">
              <div className="text-center">
                {/* Error Icon */}
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-6 h-6 text-blue-600" />
                </div>

                {/* Error Message */}
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Booking unavailable
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  Unable to load venue details
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    aria-label="Retry loading booking form"
                  >
                    Retry
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                    aria-label="Go back to previous page"
                  >
                    Go back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===== MAIN RENDER =====
  return (
    <div className="min-h-[80vh]">
      <div className="max-w-[66rem] mx-auto px-4 py-2">
        {/* ===== NAVIGATION ===== */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-blue-600 font-medium rounded-lg hover:bg-white transition-all duration-200"
            aria-label="Go back to previous page"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* ===== MAIN CONTENT GRID ===== */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* ===== LEFT COLUMN - BOOKING FORM ===== */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-slate-300">
              {/* ===== FORM HEADER ===== */}
              <div className="px-6 py-4 border-b border-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-slate-900">
                      Book Venue
                    </h1>
                    <p className="text-sm text-slate-600">
                      Complete your reservation
                    </p>
                  </div>
                </div>
              </div>

              {/* ===== BOOKING FORM ===== */}
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* ===== PERSONAL INFORMATION SECTION ===== */}
                  <div>
                    <h3 className="text-md font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600" />
                      Personal Information
                    </h3>

                    {/* Name and Email Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Full Name Field */}
                      <div>
                        <label
                          htmlFor="userName"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="userName"
                            name="userName"
                            type="text"
                            placeholder="Enter your full name"
                            className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                            value={form.userName}
                            onChange={handleChange}
                            required
                            minLength={2} // Minimum name length
                            maxLength={50} // Prevent overly long names
                          />
                          <User className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                        </div>
                      </div>

                      {/* Email Field */}
                      <div>
                        <label
                          htmlFor="userEmail"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="userEmail"
                            name="userEmail"
                            type="email"
                            placeholder="your@email.com"
                            className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                            value={form.userEmail}
                            onChange={handleChange}
                            required
                          />
                          <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ===== BOOKING DETAILS SECTION ===== */}
                  <div>
                    <h3 className="text-md font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <CalendarDays className="w-5 h-5 text-blue-600" />
                      Booking Details
                    </h3>

                    {/* Date and Duration Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* Booking Date Field */}
                      <div>
                        <label
                          htmlFor="bookingDate"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Booking Date <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="bookingDate"
                            name="bookingDate"
                            type="date"
                            min={new Date().toISOString().split("T")[0]} // Prevent past dates
                            max={
                              new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                                .toISOString()
                                .split("T")[0]
                            } // Max 1 year ahead
                            className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                            value={form.bookingDate}
                            onChange={handleChange}
                            required
                          />
                          <CalendarDays className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                        </div>
                      </div>

                      {/* Duration Field */}
                      <div>
                        <label
                          htmlFor="hoursBooked"
                          className="block text-sm font-medium text-slate-700 mb-2"
                        >
                          Duration (Hours) <span className="text-red-600">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="hoursBooked"
                            name="hoursBooked"
                            type="number"
                            min="1"
                            max="24" // Maximum 24 hours
                            step="1"
                            className="w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-colors"
                            value={form.hoursBooked}
                            onChange={handleChange}
                            required
                          />
                          <Clock className="absolute left-3 top-3.5 w-4 h-4 text-slate-500" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ===== ERROR DISPLAY ===== */}
                  {/* Show booking errors to user */}
                  {mutation.error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-900">
                            Booking Failed
                          </h4>
                          <p className="text-red-700 text-sm mt-1">
                            {mutation.error.response?.data?.error ||
                              mutation.error.response?.data?.message ||
                              "Something went wrong. Please check your details and try again."}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ===== SUBMIT BUTTON ===== */}
                  <button
                    type="submit"
                    disabled={
                      mutation.isLoading ||
                      !form.userName.trim() ||
                      !form.userEmail.trim() ||
                      !form.bookingDate
                    }
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Submit booking form"
                  >
                    {mutation.isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        Confirm Booking
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* ===== RIGHT COLUMN - BOOKING SUMMARY ===== */}
          <div className="lg:col-span-1 mt-20">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200">
              {/* Summary Header */}
              <div className="bg-slate-900 px-5 py-4 rounded-t-xl">
                <h3 className="text-lg font-semibold text-white">
                  Booking Summary
                </h3>
              </div>

              {/* Summary Details */}
              <div className="p-5 space-y-4">
                {/* Venue Name */}
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Venue</span>
                  <span className="text-slate-900 font-semibold text-right max-w-[150px] break-words">
                    {venue.name || "Loading..."}
                  </span>
                </div>

                {/* Duration */}
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Duration</span>
                  <span className="text-slate-900 font-semibold">
                    {form.hoursBooked}{" "}
                    {form.hoursBooked === 1 ? "Hour" : "Hours"}
                  </span>
                </div>

                {/* Selected Date */}
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-medium">Date</span>
                  <span className="text-slate-900 font-semibold">
                    {form.bookingDate
                      ? new Date(form.bookingDate).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Not selected"}
                  </span>
                </div>

                {/* Total Price */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700 font-semibold">
                      Total Amount
                    </span>
                    <span className="text-2xl font-bold text-slate-900">
                      ₹{estimatedPrice.toLocaleString("en-IN")}{" "}
                      {/* Use Indian number formatting */}
                    </span>
                  </div>
                  {/* Price breakdown */}
                  {pricePerHour > 0 && (
                    <p className="text-xs text-slate-500 mt-1 text-right">
                      ₹{pricePerHour.toLocaleString("en-IN")}/hr ×{" "}
                      {form.hoursBooked} hour{form.hoursBooked !== 1 ? "s" : ""}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
