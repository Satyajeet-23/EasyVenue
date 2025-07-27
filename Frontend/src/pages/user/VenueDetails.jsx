// src/pages/venues/VenueDetails.jsx
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getVenueById } from '../../services/venueService';
import {
    MapPin,
    Users,
    IndianRupee,
    CalendarCheck2,
} from 'lucide-react';

export default function VenueDetails() {
    const { venueId } = useParams();

    const { data, isLoading, error } = useQuery({
        queryKey: ['venue', venueId],
        queryFn: () => getVenueById(venueId),
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="text-gray-500 text-lg animate-pulse">Loading venue details...</p>
            </div>
        );
    }

    if (error || !data?.data) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="text-red-600 text-lg font-medium">Venue not found or failed to load.</p>
            </div>
        );
    }

    const venue = data.data;

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="bg-white border border-gray-200 rounded-2xl shadow p-8 space-y-6">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{venue.name}</h2>

                <div className="space-y-4 text-gray-700 text-base">
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span><span className="font-medium">Location:</span> {venue.location}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <Users className="w-5 h-5 text-blue-600" />
                        <span><span className="font-medium">Capacity:</span> {venue.capacity}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <IndianRupee className="w-5 h-5 text-blue-600" />
                        <span><span className="font-medium">Price per Hour:</span> ₹{venue.pricePerHour}</span>
                    </div>
                </div>

                <div className="pt-6">
                    <Link
                        to={`/book/${venue.id}`}
                        className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150"
                    >
                        <CalendarCheck2 className="w-5 h-5" />
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
