// src/pages/venues/VenueList.jsx
import { useQuery } from '@tanstack/react-query';
import { getAllVenues } from '../../services/venueService';
import { Link } from 'react-router-dom';
import {
    MapPin,
    Users,
    IndianRupee,
    Building2,
} from 'lucide-react';

export default function VenueList() {
    const { data, isLoading, error } = useQuery({
        queryKey: ['venues'],
        queryFn: getAllVenues,
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="text-gray-500 text-lg animate-pulse">Loading venues...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-[50vh]">
                <p className="text-red-600 text-lg font-medium">Failed to load venues. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center flex justify-center items-center gap-2">
                <Building2 className="w-8 h-8 text-blue-600" />
                Explore Available Venues
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {data?.data?.map((venue) => (
                    <div
                        key={venue.id}
                        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-200 border border-gray-100 p-6 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                                {venue.name}
                            </h3>

                            <div className="space-y-2 text-sm text-gray-700">
                                <p className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium">Location:</span> {venue.location}
                                </p>

                                <p className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium">Capacity:</span> {venue.capacity}
                                </p>

                                <p className="flex items-center gap-2">
                                    <IndianRupee className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium">Price:</span> ₹{venue.pricePerHour}/hr
                                </p>
                            </div>
                        </div>

                        <Link
                            to={`/venues/${venue.id}`}
                            className="inline-block w-full text-center mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-150"
                        >
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
