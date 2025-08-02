// src/pages/admin/AdminVenueList.jsx
import { useQuery } from "@tanstack/react-query";
import { getAllVenues } from "../../services/venueService";
import { Link } from "react-router-dom";
import { Plus, Pencil } from "lucide-react";

export default function AdminVenueList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["adminVenues"],
    queryFn: getAllVenues,
  });

  const venues = data?.data || [];

  if (isLoading)
    return <p className="text-center mt-10 text-gray-600">Loading venues...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-600">Failed to load venues</p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Admin: Venue Management
        </h2>
        <Link
          to="/admin/venues/new"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5" />
          Add New Venue
        </Link>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg overflow-hidden">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-5 py-3 text-left">Name</th>
              <th className="px-5 py-3 text-left">Location</th>
              <th className="px-5 py-3 text-left">Capacity</th>
              <th className="px-5 py-3 text-left">Price/hr</th>
              <th className="px-5 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 text-sm">
            {venues.map((venue) => (
              <tr
                key={venue.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-5 py-3">{venue.name}</td>
                <td className="px-5 py-3">{venue.location}</td>
                <td className="px-5 py-3">{venue.capacity}</td>
                <td className="px-5 py-3">₹{venue.pricePerHour}</td>
                <td className="px-5 py-3">
                  <Link
                    to={`/admin/venues/${venue.id}/availability`}
                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 font-medium transition"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
