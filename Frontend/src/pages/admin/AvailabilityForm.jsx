// src/pages/admin/AvailabilityForm.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { updateVenueAvailability as updateAvailability } from "../../services/venueService";
import { useState } from "react";
import {
  CalendarCheck,
  CalendarX2,
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle,
  Calendar,
  Building2,
  Info,
} from "lucide-react";

export default function AvailabilityForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blockDate, setBlockDate] = useState("");
  const [unblockDate, setUnblockDate] = useState("");

  const { mutate, isLoading, error, isSuccess } = useMutation({
    mutationFn: ({ venueId, updates }) => updateAvailability(venueId, updates),
    onSuccess: () => {
      // Clear form after successful update
      setBlockDate("");
      setUnblockDate("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that at least one date is provided
    if (!blockDate && !unblockDate) {
      return;
    }

    const payload = {
      blockDates: blockDate ? [blockDate] : [],
      unblockDates: unblockDate ? [unblockDate] : [],
    };
    mutate({ venueId: id, updates: payload });
  };

  const isFormValid = blockDate || unblockDate;
  const showValidationWarning = !isFormValid && !isSuccess && !error;

  return (
    <div className="min-h-screen py-2">
      <div className="max-w-3xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate("/admin/venues")}
          className="inline-flex items-center gap-2 text--600 hover:text-blue-800 mb-6 transition-colors duration-200"
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
                <Calendar className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  Venue Availability
                </h1>
                <p className="text-blue-100 mt-1">
                  Manage venue booking availability for Venue #{id}
                </p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="p-8 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <CalendarX2 className="h-6 w-6 text-red-600" />
                  <div>
                    <h3 className="font-semibold text-red-800">Block Dates</h3>
                    <p className="text-sm text-red-600">
                      Prevent bookings on specific dates
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <CalendarCheck className="h-6 w-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-green-800">
                      Unblock Dates
                    </h3>
                    <p className="text-sm text-green-600">
                      Allow bookings on previously blocked dates
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Block Date */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarX2 className="w-5 h-5 text-red-500" />
                    Block Date
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={blockDate}
                    onChange={(e) => setBlockDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Prevent past dates
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Select a date to block from bookings
                </p>
              </div>

              {/* Unblock Date */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <CalendarCheck className="w-5 h-5 text-green-500" />
                    Unblock Date
                  </div>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={unblockDate}
                    onChange={(e) => setUnblockDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Select a previously blocked date to unblock
                </p>
              </div>

              {/* Response Feedback */}
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-medium">Update failed</p>
                    <p className="text-red-600 text-sm">
                      {error.message || "Please try again later"}
                    </p>
                  </div>
                </div>
              )}

              {isSuccess && (
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-green-800 font-medium">Success!</p>
                    <p className="text-green-600 text-sm">
                      Venue availability has been updated successfully
                    </p>
                  </div>
                </div>
              )}

              {/* Validation Message */}
              {showValidationWarning && (
                <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-800 font-medium">
                      Select at least one date
                    </p>
                    <p className="text-yellow-600 text-sm">
                      Choose either a date to block or unblock to continue
                    </p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate("/admin/venues")}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading || !isFormValid}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Update Availability
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-10 bg-white rounded-xl shadow-xl border border-gray-200 p-4 ">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600" />
            How It Works
          </h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start gap-3">
              <CalendarX2 className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong className="text-gray-800">Block Date:</strong> Prevents
                new bookings on the selected date. Existing bookings remain
                unaffected.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CalendarCheck className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong className="text-gray-800">Unblock Date:</strong> Removes
                restrictions from a previously blocked date, allowing new
                bookings again.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <Info className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
              <p>
                <strong className="text-gray-800">Note:</strong> You can select
                both options in a single update or choose just one based on your
                needs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
