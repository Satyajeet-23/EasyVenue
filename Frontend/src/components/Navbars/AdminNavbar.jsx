import { Link } from 'react-router-dom';
import { MapPin, Building, Clock } from 'lucide-react';

export default function AdminNavbar() {
    return (
        <nav className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo & Brand */}
                    <Link
                        to="/admin/venues"
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition font-bold text-xl"
                        aria-label="Go to Admin Dashboard"
                    >
                        <MapPin className="w-5 h-5 text-blue-500" />
                        EasyVenue Admin
                    </Link>

                    {/* Navigation Links */}
                    <ul className="flex items-center space-x-6 text-sm font-medium">
                        <li>
                            <Link
                                to="/admin/venues"
                                className="flex items-center gap-1 hover:text-blue-300 transition"
                                title="Manage Venues"
                            >
                                <Building className="w-4 h-4" />
                                Manage Venues
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/bookings/recent"
                                className="flex items-center gap-1 hover:text-blue-300 transition"
                                title="View Recent Bookings"
                            >
                                <Clock className="w-4 h-4" />
                                Recent Bookings
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
