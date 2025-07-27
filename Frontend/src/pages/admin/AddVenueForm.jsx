// src/pages/admin/AddVenueForm.jsx
import { useMutation } from '@tanstack/react-query';
import { createVenue } from '../../services/venueService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

export default function AddVenueForm() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: '',
        location: '',
        capacity: '',
        pricePerHour: '',
        createdBy: '',
    });

    const { mutate, isLoading, error } = useMutation({
        mutationFn: createVenue,
        onSuccess: () => navigate('/admin/venues'),
    });

    const handleChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(form);
    };

    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <div className="bg-white shadow-md rounded-xl p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <PlusCircle className="h-6 w-6 text-green-600" />
                    <h2 className="text-2xl font-bold text-gray-800">Add New Venue</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Input Fields */}
                    {[
                        { name: 'name', label: 'Venue Name' },
                        { name: 'location', label: 'Location' },
                        { name: 'capacity', label: 'Capacity', type: 'number' },
                        { name: 'pricePerHour', label: 'Price per Hour (₹)', type: 'number' },
                        { name: 'createdBy', label: 'Created By (User ID)' },
                    ].map(({ name, label, type }) => (
                        <div key={name}>
                            <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
                                {label}
                            </label>
                            <input
                                id={name}
                                name={name}
                                type={type || 'text'}
                                placeholder={label}
                                value={form[name]}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    ))}

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-600 text-sm">
                            Error: {error.response?.data?.error || 'Failed to add venue'}
                        </p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-60"
                    >
                        {isLoading ? 'Adding...' : 'Add Venue'}
                    </button>
                </form>
            </div>
        </div>
    );
}
