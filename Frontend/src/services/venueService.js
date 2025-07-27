import apiClient from './apiClient';

// Create new venue (Admin)
export const createVenue = (venueData) =>
    apiClient.post('/venues', venueData);

// Get all venues
export const getAllVenues = () =>
    apiClient.get('/venues');

// Get venue by ID
export const getVenueById = (id) =>
    apiClient.get(`/venues/${id}`);

// Update venue availability (Admin)
export const updateVenueAvailability = (id, availabilityData) =>
    apiClient.put(`/venues/${id}/availability`, availabilityData);
