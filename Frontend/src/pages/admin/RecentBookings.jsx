import { useQuery } from "@tanstack/react-query";
import { getRecentBookings } from "../../services/bookingService";

export default function RecentBookings() {
  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recentBookings"],
    queryFn: getRecentBookings,
  });

  // ← DEBUG: Add console log to see what we're getting
  console.log("Recent bookings data:", bookings);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Error loading recent bookings: {error.message}
      </div>
    );
  }

  // ← FIX: Handle both array and object responses
  const bookingList = Array.isArray(bookings) ? bookings : bookings?.data || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Bookings</h2>

      {bookingList.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-600">No recent bookings found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full border-collapse bg-white">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="p-3 text-left font-semibold text-gray-700">
                  Customer
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Email
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Booking Date
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Hours
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Venue
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Total Cost
                </th>
                <th className="p-3 text-left font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((booking, index) => (
                <tr
                  key={booking.id}
                  className={`border-t text-gray-800 text-sm ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition duration-200`}
                >
                  <td className="p-3 font-medium">{booking.userName}</td>
                  <td className="p-3">{booking.userEmail}</td>
                  <td className="p-3">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">{booking.hoursBooked} hr</td>
                  <td className="p-3">{booking.venue?.name || "N/A"}</td>
                  <td className="p-3">
                    ₹{booking.totalCost?.toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        booking.status === "CONFIRMED"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
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
  );
}
