package com.easyvenue.backend.service.impl;

import com.easyvenue.backend.model.Booking;
import com.easyvenue.backend.model.Venue;
import com.easyvenue.backend.repository.BookingRepository;
import com.easyvenue.backend.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for managing venue booking operations
 * Handles business logic for booking creation, validation, and management
 */
@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private VenueRepository venueRepository;

    /**
     * Retrieves all bookings in the system
     * Used primarily for administrative purposes and reporting
     * @return Complete list of all booking records
     */
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    /**
     * Creates a new venue booking with comprehensive validation
     * Ensures venue availability, prevents double-booking, and calculates costs
     * @param booking Booking entity with customer details and preferences
     * @return Successfully created and saved booking with generated ID
     * @throws IllegalArgumentException if venue doesn't exist, is unavailable, or already booked
     */
    @Transactional
    public Booking createBooking(Booking booking) {
        // Step 1: Validate venue existence
        Venue venue = validateVenueExists(booking.getVenue().getId());

        // Step 2: Check venue availability for the requested date
        LocalDate bookingDate = booking.getBookingDate();
        validateVenueAvailability(venue, bookingDate);

        // Step 3: Prevent double-booking conflicts
        validateNoExistingBooking(venue.getId(), bookingDate);

        // Step 4: Calculate and set total booking cost
        Double totalCost = calculateBookingCost(venue, booking.getHoursBooked());
        booking.setTotalCost(totalCost);
        booking.setVenue(venue);

        // Step 5: Save booking to database
        Booking savedBooking = bookingRepository.save(booking);

        // Step 6: Update venue availability calendar
        blockVenueDate(venue, bookingDate);

        return savedBooking;
    }

    /**
     * Retrieves the 10 most recent bookings for admin dashboard
     * Includes debug logging for monitoring booking activity
     * @return List of recent bookings ordered by creation date
     */
    public List<Booking> getRecentBookings() {
        List<Booking> bookings = bookingRepository.findTop10ByOrderByCreatedAtDesc();
        System.out.println("📊 Found " + bookings.size() + " recent bookings");
        return bookings;
    }

    /**
     * Finds a specific booking by its unique identifier
     * @param id Booking ID to search for
     * @return Optional containing the booking if found, empty otherwise
     */
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    /**
     * Permanently removes a booking from the system
     * Note: Consider implementing soft delete for audit trail
     * @param id Booking ID to delete
     */
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    /**
     * Updates an existing booking with new customer details or preferences
     * Does not allow changing venue or date to prevent availability conflicts
     * @param id Booking ID to update
     * @param updatedBooking New booking information
     * @return Updated booking entity
     * @throws RuntimeException if booking with given ID doesn't exist
     */
    public Booking updateBooking(Long id, Booking updatedBooking) {
        return bookingRepository.findById(id)
                .map(existingBooking -> {
                    // Update only safe-to-change fields
                    existingBooking.setUserName(updatedBooking.getUserName());
                    existingBooking.setUserEmail(updatedBooking.getUserEmail());
                    existingBooking.setBookingDate(updatedBooking.getBookingDate());
                    existingBooking.setHoursBooked(updatedBooking.getHoursBooked());

                    return bookingRepository.save(existingBooking);
                })
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + id));
    }

    // =============== PRIVATE HELPER METHODS ===============

    /**
     * Validates that the specified venue exists in the system
     * @param venueId Venue identifier to validate
     * @return Venue entity if found
     * @throws IllegalArgumentException if venue doesn't exist
     */
    private Venue validateVenueExists(Long venueId) {
        return venueRepository.findById(venueId)
                .orElseThrow(() -> new IllegalArgumentException("Venue not found"));
    }

    /**
     * Checks if venue is available on the requested booking date
     * @param venue Venue to check availability for
     * @param bookingDate Date to validate availability
     * @throws IllegalArgumentException if venue is blocked on the date
     */
    private void validateVenueAvailability(Venue venue, LocalDate bookingDate) {
        if (venue.getUnavailableDates().contains(bookingDate)) {
            throw new IllegalArgumentException("Venue is not available on the selected date");
        }
    }

    /**
     * Ensures no existing confirmed booking exists for the venue and date
     * @param venueId Venue identifier to check
     * @param bookingDate Date to check for conflicts
     * @throws IllegalArgumentException if venue is already booked
     */
    private void validateNoExistingBooking(Long venueId, LocalDate bookingDate) {
        Optional<Booking> existingBooking = bookingRepository
                .findConfirmedBookingByVenueAndDate(venueId, bookingDate);

        if (existingBooking.isPresent()) {
            throw new IllegalArgumentException("Venue is already booked on this date");
        }
    }

    /**
     * Calculates total cost based on venue pricing and booking duration
     * @param venue Venue with pricing information
     * @param hoursBooked Number of hours to book
     * @return Total cost for the booking
     */
    private Double calculateBookingCost(Venue venue, Integer hoursBooked) {
        return venue.getPricePerHour() * hoursBooked;
    }

    /**
     * Adds the booking date to venue's unavailable dates list
     * @param venue Venue to update availability for
     * @param bookingDate Date to block from future bookings
     */
    private void blockVenueDate(Venue venue, LocalDate bookingDate) {
        venue.getUnavailableDates().add(bookingDate);
        venueRepository.save(venue);
    }
}
