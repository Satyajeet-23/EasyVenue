// src/pages/venues/BookingSuccess.jsx
import { Link } from 'react-router-dom';
import { CheckCircle, PartyPopper } from 'lucide-react';

export default function BookingSuccess() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 bg-gray-50">
            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                {/* Animated Icon */}
                <div className="flex justify-center mb-5">
                    <CheckCircle className="h-16 w-16 text-green-500 animate-pulse" />
                </div>

                {/* Heading */}
                <h2 className="text-3xl font-bold text-green-700 mb-2">
                    Booking Confirmed!
                </h2>

                {/* Message */}
                <p className="text-gray-600 text-base mb-4">
                    Thank you for your booking.
                </p>

                {/* Celebration Icon (Optional Enhancement) */}
                <div className="flex justify-center mb-6">
                    <PartyPopper className="h-6 w-6 text-yellow-500" />
                </div>

                {/* Action Button */}
                <Link
                    to="/venues"
                    className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
                >
                    Back to Venues
                </Link>
            </div>
        </div>
    );
}
