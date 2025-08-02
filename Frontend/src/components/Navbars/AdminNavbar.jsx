import { Link } from "react-router-dom";
import { MapPin, Building, Clock } from "lucide-react";

export default function AdminNavbar() {
  return (
    <nav className="bg-gray-900 text-white m-5 rounded-xl shadow-lg sticky top-5 z-50">
      <div className="mx-auto px-6 py-1.5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-2xl flex items-center gap-1 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-400 font-extrabold"
              aria-label="Go to Admin Dashboard"
            >
              <MapPin className="w-7 h-7 text-blue-700" strokeWidth={2.5} />
              EasyVenue Admin
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-5 text-sm font-medium">
            <li>
              <Link
                to="/admin/venues"
                className="flex items-center gap-1 hover:text-blue-400 font-semibold transition-all duration-200 px-2 py-2 rounded-lg"
                title="Manage Venues"
              >
                <Building className="w-[18px] h-[18px]" />
                Manage Venues
              </Link>
            </li>
            <li>
              <Link
                to="/admin/bookings/recent"
                className="flex items-center gap-1 hover:text-blue-400 font-semibold transition-all duration-200 py-2 rounded-lg"
                title="View Recent Bookings"
              >
                <Clock className="w-[18px] h-[18px]" />
                Recent Bookings
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
