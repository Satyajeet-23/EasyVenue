import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getVenueById } from "../../services/venueService";
import {
  MapPin,
  Users,
  IndianRupee,
  CalendarCheck2,
  Building2,
  ArrowLeft,
  CheckCircle,
  Loader2,
} from "lucide-react";

export default function VenueDetails() {
  // ROUTE PARAMETERS
  // Extract venue ID from URL parameters for data fetching
  const { venueId } = useParams();

  // DATA FETCHING
  // Fetch specific venue data using React Query with caching and error handling
  const { data, isLoading, error } = useQuery({
    queryKey: ["venue", venueId],
    queryFn: () => getVenueById(venueId),
    enabled: !!venueId, // Only fetch if venueId exists
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 3, // Retry failed requests
  });

  // LOADING STATE
  // Display loading spinner while fetching venue details
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <div className="relative">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
        <p
          className="mt-4 text-gray-600 font-medium"
          role="status"
          aria-live="polite"
        >
          Loading Venue Details...
        </p>
      </div>
    );
  }

  // ERROR STATE
  // Handle venue not found or network errors with user-friendly options
  if (error || !data?.data) {
    return (
      <div className="min-h-[80vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-sm mx-4">
              <div className="text-center">
                {/* Error Icon */}
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>

                {/* Error Message */}
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Venue unavailable
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  This venue couldn't be found or is temporarily unavailable
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Retry loading venue details"
                  >
                    Retry
                  </button>
                  <Link
                    to="/venues"
                    className="px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Browse venues
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // VENUE DATA
  // Extract venue data from API response with safe access
  const venue = data.data;

  // MAIN RENDER
  return (
    <div className="min-h-[80vh]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* NAVIGATION */}
        {/* Back button for easy navigation to venue list */}
        <div className="mb-6">
          <Link
            to="/venues"
            className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-blue-800 font-medium rounded-lg hover:bg-white/60 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Go back to venues list"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Venues
          </Link>
        </div>

        {/* MAIN CONTENT GRID */}
        {/* Two-column layout: venue info on left, booking card on right */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN - VENUE INFORMATION */}
          <div className="lg:col-span-2 space-y-6 pt-8">
            {/* VENUE HEADER */}
            {/* Main venue information with gradient background */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-300/60 overflow-hidden">
              <div className="relative">
                {/* Subtle Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>

                <div className="relative px-8 py-8">
                  <div className="flex items-start gap-6">
                    {/* Venue Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Venue Title and Location */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                          {venue.name}
                        </h1>
                        {/* Availability Badge */}
                        <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          <CheckCircle className="w-3 h-3" />
                          Available
                        </div>
                      </div>

                      {/* Location Display */}
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-5 h-5 text-blue-500" />
                        <span className="text-lg font-medium">
                          {venue.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* VENUE FEATURES */}
            {/* Detailed information cards for capacity and pricing */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-300/60 p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Venue Details
              </h2>

              {/* FEATURES GRID */}
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Capacity Feature Card */}
                <div className="group">
                  <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border border-blue-100/60 hover:shadow-md transition-all duration-200">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-1">
                        Capacity
                      </h3>
                      <p className="text-2xl font-bold text-slate-900">
                        {venue.capacity}
                      </p>
                      <p className="text-sm text-slate-600">Maximum Guests</p>
                    </div>
                  </div>
                </div>

                {/* Pricing Feature Card */}
                <div className="group">
                  <div className="flex items-center gap-4 p-6 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border border-emerald-100/60 hover:shadow-md transition-all duration-200">
                    <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                      <IndianRupee className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-1">
                        Rate
                      </h3>
                      <p className="text-2xl font-bold text-slate-900">
                        ₹{venue.pricePerHour?.toLocaleString("en-IN") || "N/A"}
                      </p>
                      <p className="text-sm text-slate-600">Per Hour</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN - BOOKING CARD */}
          {/* Prominent booking card with pricing and CTA */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 overflow-hidden sticky top-4">
              {/* PRICING HEADER */}
              {/* Dark header with prominent pricing display */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">
                    ₹{venue.pricePerHour?.toLocaleString("en-IN") || "N/A"}
                    <span className="text-xl font-normal text-slate-300">
                      {" "}
                      / hour
                    </span>
                  </div>
                  <p className="text-slate-300">Professional venue booking</p>
                </div>
              </div>

              {/* BOOKING DETAILS */}
              {/* Venue information summary and booking button */}
              <div className="px-8 py-6 space-y-4">
                {/* VENUE INFORMATION LIST */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">
                      Venue Capacity
                    </span>
                    <span className="text-slate-900 font-semibold">
                      {venue.capacity} guests
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">Location</span>
                    <span className="text-slate-900 font-semibold text-right max-w-[120px] break-words">
                      {venue.location}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600 font-medium">
                      Availability
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-emerald-600 font-semibold">
                        Available
                      </span>
                    </div>
                  </div>
                </div>

                {/* BOOKING CTA BUTTON */}
                {/* Primary action button for booking */}
                <div className="pt-4">
                  <Link
                    to={`/book/${venue.id || venue._id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={`Book ${venue.name} venue in ${venue.location}`}
                  >
                    <CalendarCheck2 className="w-5 h-5" />
                    Book This Venue
                  </Link>
                </div>

                {/* TRUST INDICATORS */}
                {/* Small trust elements to build confidence */}
                <p className="text-xs text-slate-500 text-center pt-2">
                  Instant confirmation • Secure booking • 24/7 support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
