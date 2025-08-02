import { useQuery } from "@tanstack/react-query";
import { getAllVenues } from "../../services/venueService";
import { Link } from "react-router-dom";
import {
  MapPin,
  Users,
  IndianRupee,
  Building2,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function VenueList() {
  // DATA FETCHING
  // Using React Query for efficient data fetching and caching
  const { data, isLoading, error } = useQuery({
    queryKey: ["venues"],
    queryFn: getAllVenues,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    retry: 3, // Retry failed requests 3 times
  });

  // LOADING STATE
  // Professional loading spinner with proper accessibility
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
          Loading Venues...
        </p>
      </div>
    );
  }

  // ERROR STATE
  // Clean error handling with retry functionality and user-friendly messaging
  if (error) {
    return (
      <div className="min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex justify-center items-center h-[60vh]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-sm mx-4">
              <div className="text-center">
                {/* Error Icon */}
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>

                {/* Error Message */}
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No venues found
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  We couldn't load any venues right now. Please check your
                  connection and try again.
                </p>

                {/* Retry Button */}
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Retry loading venues"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MAIN RENDER
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* PAGE HEADER */}
        {/* Hero section with gradient title and description */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Find Your Perfect Venue
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover exceptional spaces for your next unforgettable event
          </p>
        </div>

        {/* VENUES GRID */}
        {/* Responsive grid layout with interactive venue cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(data?.data || [])
            .sort((a, b) => a.id - b.id)
            ?.map((venue) => (
              <Link
                to={`/venues/${venue.id || venue._id}`}
                key={venue.id || venue._id}
                className="group bg-white rounded-2xl overflow-hidden p-6 shadow-lg hover:shadow-xl
                       border border-gray-200 transition-all duration-300 transform hover:-translate-y-1
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label={`View details for ${venue.name} in ${venue.location}`}
              >
                {/* VENUE HEADER */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    {/* Venue Name */}
                    <h3
                      className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 
                               transition-colors duration-300 mb-2 line-clamp-1"
                    >
                      {venue.name}
                    </h3>

                    {/* Location with icon */}
                    <div className="flex items-center text-gray-500">
                      <MapPin
                        className="w-4 h-4 mr-2 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="text-sm line-clamp-1">
                        {venue.location}
                      </span>
                    </div>
                  </div>

                  {/* Venue Icon - Animated on hover */}
                  <div
                    className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center 
                              transform group-hover:scale-110 transition-all duration-300 ml-4"
                  >
                    <Building2 className="w-6 h-6 text-blue-500" />
                  </div>
                </div>

                {/* VENUE DETAILS */}
                <div className="space-y-4">
                  {/* CAPACITY AND PRICE GRID */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Capacity Card */}
                    <div className="flex items-center p-3 rounded-xl bg-blue-50 group-hover:bg-blue-100 transition-colors">
                      <Users
                        className="w-5 h-5 text-blue-600 mr-3 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Capacity
                        </p>
                        <p className="font-semibold text-gray-900">
                          {venue.capacity}
                        </p>
                      </div>
                    </div>

                    {/* Price Card */}
                    <div className="flex items-center p-3 rounded-xl bg-purple-50 group-hover:bg-purple-100 transition-colors">
                      <IndianRupee
                        className="w-5 h-5 text-purple-600 mr-3 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="text-xs text-gray-500 font-medium">
                          Per Hour
                        </p>
                        <p className="font-semibold text-gray-900">
                          ₹
                          {venue.pricePerHour?.toLocaleString("en-IN") || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* VIEW DETAILS CTA */}
                  {/* Interactive call-to-action with animated arrow */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-sm font-medium text-gray-600">
                      View Details
                    </span>
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 
                                group-hover:bg-blue-600 transition-all duration-300"
                    >
                      <ArrowRight className="w-4 h-4 text-blue-600 group-hover:text-white transition-all duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* EMPTY STATE */}
        {/* Display when no venues are available in the database */}
        {data?.data?.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-lg">
            <div
              className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 
                          rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Building2 className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-3">
              No Venues Available
            </h3>
            <p className="text-gray-600 mb-6">
              We're adding new venues soon. Check back later!
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Refresh page to check for new venues"
            >
              Refresh Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
