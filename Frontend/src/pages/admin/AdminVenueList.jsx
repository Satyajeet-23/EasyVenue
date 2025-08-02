// src/pages/admin/AdminVenueList.jsx
import { useQuery } from "@tanstack/react-query";
import { getAllVenues } from "../../services/venueService";
import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  MapPin,
  Users,
  Clock,
  IndianRupee,
  Building2,
  Loader2,
} from "lucide-react";

export default function AdminVenueList() {
  // Enhanced query with caching and retry logic for better UX
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminVenues"],
    queryFn: getAllVenues,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes to reduce API calls
    retry: 3, // Retry failed requests 3 times before showing error
  });

  // Sort venues by ID in ascending order for consistent display
  const venues = (data?.data || []).sort((a, b) => a.id - b.id);

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
          Loading Venues List...
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
            <div className="bg-white rounded-xl shadow-sm border border-gray-300 p-8 max-w-sm mx-4">
              <div className="text-center">
                {/* Error Icon */}
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>

                {/* Error Message */}
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Failed to load venues
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  We couldn't load the venue data right now. Please check your
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Venue Management
            </h1>
            <p className="text-gray-600 text-lg">
              Manage and monitor all venue listings
            </p>
            {/* Dynamic venue count badge */}
            <div className="flex items-center gap-4 mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {venues.length} Total Venues
              </span>
            </div>
          </div>
          {/* Add new venue CTA */}
          <Link
            to="/admin/venues/new"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-medium"
          >
            <Plus className="h-5 w-5" />
            Add New Venue
          </Link>
        </div>
      </div>

      {/* Stats Cards - Dynamic calculations from venue data */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total venues count */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Venues</p>
              <p className="text-2xl font-bold text-gray-900">
                {venues.length}
              </p>
            </div>
          </div>
        </div>

        {/* Combined capacity across all venues */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Capacity
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {venues.reduce((sum, venue) => sum + (venue.capacity || 0), 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Average price calculation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <IndianRupee className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Avg. Price/Hour
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ₹
                {venues.length > 0
                  ? Math.round(
                      venues.reduce(
                        (sum, venue) => sum + (venue.pricePerHour || 0),
                        0,
                      ) / venues.length,
                    )
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Venues Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-400 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-400">
            {/* Table header with proper styling */}
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-md font-semibold text-gray-800 uppercase tracking-wider">
                  Venue Details
                </th>
                <th className="px-6 py-4 text-left text-md font-semibold text-gray-800 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-md font-semibold text-gray-800 uppercase tracking-wider">
                  Capacity
                </th>
                <th className="px-6 py-4 text-left text-md font-semibold text-gray-800 uppercase tracking-wider">
                  Pricing
                </th>
                <th className="px-6 py-4 text-right text-md font-semibold text-gray-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            {/* Table body with venue data rows */}
            <tbody className="bg-white divide-y divide-gray-300">
              {venues.map((venue) => (
                <tr
                  key={venue.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  {/* Venue name and ID with building icon */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Building2 className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="ml-5">
                        <div className="text-md tracking-wide font-semibold text-gray-900">
                          {venue.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: #{venue.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Location with map pin icon */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      {venue.location}
                    </div>
                  </td>

                  {/* Capacity with users icon */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-900">
                        {venue.capacity}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">people</span>
                    </div>
                  </td>

                  {/* Price with rupee icon */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <IndianRupee className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm font-semibold text-gray-900">
                        {venue.pricePerHour}
                      </span>
                      <span className="text-xs text-gray-500 ml-1">/hour</span>
                    </div>
                  </td>

                  {/* Edit action button */}
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Link
                      to={`/admin/venues/${venue.id}/availability`}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 border border-blue-200 hover:border-blue-300"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit Venue
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state when no venues are available */}
        {venues.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No venues found
            </h3>
            <p className="text-gray-500 mb-6">
              Get started by adding your first venue.
            </p>
            <Link
              to="/admin/venues/new"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <Plus className="h-4 w-4" />
              Add Your First Venue
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
