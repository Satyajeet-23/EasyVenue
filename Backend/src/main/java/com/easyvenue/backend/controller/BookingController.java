package com.easyvenue.backend.controller;

import com.easyvenue.backend.dto.BookingRequest;
import com.easyvenue.backend.model.Booking;
import com.easyvenue.backend.model.Venue;
import com.easyvenue.backend.service.impl.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST Controller for managing venue bookings
 * Handles all booking-related HTTP requests and responses
 */
@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    /**
     * Retrieves all bookings in the system
     * @return List of all booking records
     */
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    /**
     * Creates a new venue booking
     * @param request Booking details including venue ID, user info, and booking preferences
     * @return Success response with booking confirmation or error message
     */
    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody BookingRequest request) {
        try {
            // Map request data to booking entity
            Booking booking = mapRequestToBooking(request);

            // Process booking through service layer
            Booking createdBooking = bookingService.createBooking(booking);

            // Return success response with booking details
            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                    "message", "Booking confirmed successfully",
                    "booking", createdBooking
            ));
        } catch (IllegalArgumentException e) {
            // Handle validation errors (venue not found, unavailable dates, etc.)
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * Retrieves the 10 most recent bookings for admin dashboard
     * @return List of recent bookings ordered by creation date
     */
    @GetMapping("/recent")
    public List<Booking> getRecentBookings() {
        return bookingService.getRecentBookings();
    }

    /**
     * Retrieves a specific booking by its ID
     * @param id Booking identifier
     * @return Booking details or 404 if not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Cancels a booking by removing it from the system
     * @param id Booking identifier to cancel
     * @return 204 No Content on successful deletion
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Updates an existing booking with new details
     * @param id Booking identifier to update
     * @param updatedBooking New booking information
     * @return Updated booking details or 404 if booking not found
     */
    @PutMapping("/{id}")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id,
                                                 @RequestBody Booking updatedBooking) {
        try {
            Booking updated = bookingService.updateBooking(id, updatedBooking);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            // Handle case where booking ID doesn't exist
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Helper method to convert booking request DTO to booking entity
     * @param request Incoming booking request data
     * @return Properly mapped booking entity ready for processing
     */
    private Booking mapRequestToBooking(BookingRequest request) {
        Booking booking = new Booking();
        booking.setUserName(request.getUserName());
        booking.setUserEmail(request.getUserEmail());
        booking.setBookingDate(request.getBookingDate());
        booking.setHoursBooked(request.getHoursBooked());

        // Associate booking with venue using venue ID
        Venue venue = new Venue();
        venue.setId(request.getVenueId());
        booking.setVenue(venue);

        return booking;
    }
}
