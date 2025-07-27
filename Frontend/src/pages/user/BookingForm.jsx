// src/pages/venues/BookingForm.jsx
import { useMutation } from '@tanstack/react-query';
import { createBooking } from '../../services/bookingService';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
    User,
    Mail,
    CalendarDays,
    Clock,
    Loader2,
    AlertCircle,
} from 'lucide-react';

export default function BookingForm() {
    const { venueId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        userName: '',
        userEmail: '',
        bookingDate: '',
        hoursBooked: 1,
    });

    const mutation = useMutation({
        mutationFn: createBooking,
        onSuccess: (response) => {
            // ← ENHANCED: Handle Spring Boot success response
            console.log('Booking successful:', response);
            navigate(`/book/${venueId}/confirm`);
        },
        onError: (error) => {
            console.error('Booking failed:', error);
        },
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ ...form, venueId: parseInt(venueId) });
    };

    return (
        <div className="max-w-lg mx-auto px-4 py-10">
            <div className="bg-white shadow-md rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Book This Venue</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Name
                        </label>
                        <div className="relative">
                            <input
                                id="userName"
                                name="userName"
                                type="text"
                                placeholder="John Doe"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.userName}
                                onChange={handleChange}
                                required
                            />
                            <User className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="userEmail" className="block text-sm font-medium text-gray-700 mb-1">
                            Your Email
                        </label>
                        <div className="relative">
                            <input
                                id="userEmail"
                                name="userEmail"
                                type="email"
                                placeholder="john@example.com"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.userEmail}
                                onChange={handleChange}
                                required
                            />
                            <Mail className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Booking Date */}
                    <div>
                        <label htmlFor="bookingDate" className="block text-sm font-medium text-gray-700 mb-1">
                            Booking Date
                        </label>
                        <div className="relative">
                            <input
                                id="bookingDate"
                                name="bookingDate"
                                type="date"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.bookingDate}
                                onChange={handleChange}
                                required
                            />
                            <CalendarDays className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Hours Booked */}
                    <div>
                        <label htmlFor="hoursBooked" className="block text-sm font-medium text-gray-700 mb-1">
                            Hours to Book
                        </label>
                        <div className="relative">
                            <input
                                id="hoursBooked"
                                name="hoursBooked"
                                type="number"
                                min="1"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={form.hoursBooked}
                                onChange={handleChange}
                                required
                            />
                            <Clock className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                        </div>
                    </div>

                    {/* Error Feedback */}
                    {mutation.error && (
                        <div className="flex items-start gap-2 text-red-600 text-sm mt-1">
                            <AlertCircle className="w-5 h-5 mt-[2px]" />
                            <p>
                                {mutation.error.response?.data?.error || mutation.error.response?.data?.message || 'Booking failed. Please try again.'}
                            </p>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={mutation.isLoading}
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
                    >
                        {mutation.isLoading ? (
                            <>
                                <Loader2 className="animate-spin w-5 h-5" />
                                Booking...
                            </>
                        ) : (
                            'Confirm Booking'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
