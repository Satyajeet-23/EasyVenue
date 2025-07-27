import { Link } from 'react-router-dom';
import { MapPin, Home } from 'lucide-react';

export default function PublicNavbar() {
    return (
        <nav className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <Link
                            to="/"
                            className="text-2xl font-extrabold text-blue-600 tracking-tight flex items-center gap-1"
                        >
                            <MapPin className="w-6 h-6 text-blue-600" />
                            EasyVenue
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <ul className="flex items-center space-x-6">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                <Home className="h-4 w-4" />
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/venues"
                                className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition"
                            >
                                <MapPin className="h-4 w-4" />
                                Venues
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
