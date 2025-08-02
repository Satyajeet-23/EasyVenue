import { useQuery } from "@tanstack/react-query";
import { getRecentBookings } from "../../services/bookingService";
import {
  Calendar,
  Clock,
  Users,
  Building2,
  IndianRupee,
  Mail,
  CheckCircle,
  XCircle,
  User,
  Loader2,
} from "lucide-react";

export default function RecentBookings() {
  // Enhanced query with caching and retry logic for better UX
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recentBookings"],
    queryFn: getRecentBookings,
    staleTime: 3 * 60 * 1000, // Cache data for 3 minutes to reduce API calls
    retry: 3, // Retry failed requests 3 times before showing error
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes for real-time data
  });

  // Handle both array and object responses from different API structures
  const bookingList = Array.isArray(bookings) ? bookings : bookings?.data || [];

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
          Loading Recent Bookings...
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
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>

                {/* Error Message */}
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Failed to load bookings
                </h3>
                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                  We couldn't load the booking data right now. Please check your
                  connection and try again.
                </p>

                {/* Retry Button */}
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Retry loading bookings"
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

  // Calculate dynamic stats from booking data
  const confirmedBookings = bookingList.filter(
    (b) => b.status === "CONFIRMED",
  ).length;
  const totalRevenue = bookingList.reduce(
    (sum, booking) => sum + (booking.totalCost || 0),
    0,
  );
  const totalHours = bookingList.reduce(
    (sum, booking) => sum + (booking.hoursBooked || 0),
    0,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 min-h-[80vh]">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Recent Bookings
            </h1>
            <p className="text-gray-600 text-lg">
              Monitor and track recent venue bookings
            </p>
            {/* Dynamic booking count badge */}
            <div className="flex items-center gap-4 mt-3">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {bookingList.length} Total Bookings
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - Real-time calculations from booking data */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Total bookings count */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-100">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Bookings
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {bookingList.length}
              </p>
            </div>
          </div>
        </div>

        {/* Confirmed bookings count */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-100">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Confirmed</p>
              <p className="text-2xl font-bold text-gray-900">
                {confirmedBookings}
              </p>
            </div>
          </div>
        </div>

        {/* Total revenue calculation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-100">
              <IndianRupee className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Total hours booked */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-orange-100">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-gray-900">{totalHours}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table header */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-900">
            All Recent Bookings
          </h3>
        </div>

        {/* Empty state when no bookings are available */}
        {bookingList.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No recent bookings
            </h3>
            <p className="text-gray-500">
              Bookings will appear here once customers start making
              reservations.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              {/* Table header with proper column definitions */}
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Customer Details
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Booking Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Venue
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total Cost
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>

              {/* Table body with booking data rows */}
              <tbody className="bg-white divide-y divide-gray-200">
                {bookingList.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Customer details with avatar and email */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-semibold text-gray-900">
                            {booking.userName}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <Mail className="h-3 w-3 mr-1" />
                            {booking.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Booking date with proper formatting */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        {new Date(booking.bookingDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
                      </div>
                    </td>

                    {/* Duration with proper pluralization */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm font-medium text-gray-900">
                          {booking.hoursBooked}
                        </span>
                        <span className="text-xs text-gray-500 ml-1">
                          {booking.hoursBooked === 1 ? "hour" : "hours"}
                        </span>
                      </div>
                    </td>

                    {/* Venue name with building icon */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <Building2 className="h-4 w-4 text-gray-400 mr-2" />
                        {booking.venue?.name || "N/A"}
                      </div>
                    </td>

                    {/* Total cost with rupee formatting */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm font-semibold text-gray-900">
                          {booking.totalCost?.toLocaleString()}
                        </span>
                      </div>
                    </td>

                    {/* Status badge with icons and proper styling */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          booking.status === "CONFIRMED"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        {booking.status === "CONFIRMED" ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : (
                          <XCircle className="h-3 w-3" />
                        )}
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
