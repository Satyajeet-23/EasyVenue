import { Link } from "react-router-dom";
import { MapPin, Home } from "lucide-react";

export default function PublicNavbar() {
  return (
    <nav className="bg-white m-5 rounded-xl shadow-lg sticky top-5 z-50 border border-gray-300">
      <div className="mx-auto px-6 py-1.5 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600 flex items-center gap-1"
            >
              <MapPin className="w-7 h-7 text-blue-900" strokeWidth={2.5} />
              EasyVenue
            </Link>
          </div>

          {/* Nav Links */}
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                to="/"
                className="flex items-center gap-1 text-gray-700 hover:text-blue-700 font-semibold transition-all duration-200 py-2 rounded-lg"
              >
                <Home className="h-[18px] w-[18px]" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/venues"
                className="flex items-center gap-1 text-gray-700 hover:text-blue-700 font-semibold transition-all duration-200 py-2 rounded-lg"
              >
                <MapPin className="h-[18px] w-[18px]" />
                Venues
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
