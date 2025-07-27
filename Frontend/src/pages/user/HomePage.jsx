// src/pages/HomePage.jsx
import { Link } from 'react-router-dom';
import { MapPin, Shield } from 'lucide-react';

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 flex items-center justify-center px-4 py-16">
            <div className="max-w-3xl text-center">
                {/* Logo & Title */}
                <div className="flex items-center justify-center gap-2 mb-4">
                    <MapPin className="h-8 w-8 text-blue-600" />
                    <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
                        Easy<span className="text-blue-600">Venue</span>
                    </h1>
                </div>

                {/* Subheading */}
                <p className="text-lg text-gray-700 mt-4 mb-10 max-w-2xl mx-auto">
                    Discover and book the perfect venue for your next event — fast, easy, and hassle-free.
                    Whether it's a corporate meeting or a wedding, we've got the right space for you.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    {/* View Venues */}
                    <Link
                        to="/venues"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium text-base shadow-md hover:bg-blue-700 transition duration-200"
                    >
                        <MapPin className="h-5 w-5" />
                        View Venues
                    </Link>

                    {/* Admin Panel */}
                    <Link
                        to="/admin/venues"
                        className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl font-medium text-base shadow-md hover:bg-gray-900 transition duration-200"
                    >
                        <Shield className="h-5 w-5" />
                        Admin Panel
                    </Link>
                </div>
            </div>
        </div>
    );
}
