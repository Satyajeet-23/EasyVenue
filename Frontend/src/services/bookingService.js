// frontend/src/services/bookingService.js
import apiClient from "./apiClient";

// Create a booking
export const createBooking = (bookingData) => {
  console.log("Sending booking data:", bookingData);
  return apiClient.post("/bookings", bookingData).then((res) => res.data);
};

// ← FIX: Get recent bookings - Spring Boot returns array directly
export const getRecentBookings = () =>
  apiClient.get("/bookings/recent").then((res) => res.data); // Spring Boot returns array directly, not nested in 'data'
