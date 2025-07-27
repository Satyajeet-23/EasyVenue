// src/pages/admin/AvailabilityForm.jsx
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { updateVenueAvailability as updateAvailability } from '../../services/venueService';
import { useState } from 'react';
import { CalendarCheck, CalendarX2 } from 'lucide-react';

export default function AvailabilityForm() {
    const { id } = useParams();
    const [blockDate, setBlockDate] = useState('');
    const [unblockDate, setUnblockDate] = useState('');

    const { mutate, isLoading, error, isSuccess } = useMutation({
        mutationFn: ({ venueId, updates }) => updateAvailability(venueId, updates),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            blockDates: blockDate ? [blockDate] : [],
            unblockDates: unblockDate ? [unblockDate] : [],
        };
        mutate({ venueId: id, updates: payload });
    };

    return (
        <div className="max-w-md mx-auto px-4 py-10">
            <div className="bg-white p-6 rounded-xl shadow-md">
                {/* Header */}
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                    Update Venue Availability
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Block Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                            <CalendarX2 className="w-5 h-5 text-red-500" />
                            Block Date
                        </label>
                        <input
                            type="date"
                            value={blockDate}
                            onChange={(e) => setBlockDate(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-red-400 focus:outline-none"
                        />
                    </div>

                    {/* Unblock Date */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1 flex items-center gap-2">
                            <CalendarCheck className="w-5 h-5 text-green-500" />
                            Unblock Date
                        </label>
                        <input
                            type="date"
                            value={unblockDate}
                            onChange={(e) => setUnblockDate(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
                        />
                    </div>

                    {/* Response Feedback */}
                    {error && (
                        <p className="text-red-600 text-sm">
                            Error: {error.message || 'Update failed'}
                        </p>
                    )}
                    {isSuccess && (
                        <p className="text-green-600 text-sm">Availability updated successfully</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-60"
                    >
                        {isLoading ? 'Updating...' : 'Update Availability'}
                    </button>
                </form>
            </div>
        </div>
    );
}
