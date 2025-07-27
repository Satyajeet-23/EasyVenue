package com.easyvenue.backend.repository;

import com.easyvenue.backend.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing booking data operations
 * Provides database access methods for booking-related queries
 * Extends JpaRepository for standard CRUD operations
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    /**
     * Retrieves the 10 most recent bookings for admin dashboard
     * Ordered by creation timestamp in descending order (newest first)
     * @return List of recent bookings, limited to 10 records
     */
    List<Booking> findTop10ByOrderByCreatedAtDesc();

    /**
     * Finds an existing confirmed booking for a specific venue and date
     * Used to prevent double-booking conflicts when creating new bookings
     * @param venueId Unique identifier of the venue to check
     * @param bookingDate Date to check for existing confirmed bookings
     * @return Optional containing the existing booking if found, empty otherwise
     */
    @Query("SELECT b FROM Booking b WHERE b.venue.id = :venueId " +
            "AND b.bookingDate = :bookingDate " +
            "AND b.status = 'CONFIRMED'")
    Optional<Booking> findConfirmedBookingByVenueAndDate(
            @Param("venueId") Long venueId,
            @Param("bookingDate") LocalDate bookingDate
    );

    /**
     * Retrieves all bookings for a specific venue
     * Useful for venue owners to see their booking history
     * @param venueId Unique identifier of the venue
     * @return List of all bookings for the specified venue
     */
    List<Booking> findByVenueIdOrderByCreatedAtDesc(Long venueId);

    /**
     * Finds all bookings made by a specific customer
     * Based on email address for customer booking history
     * @param userEmail Customer's email address
     * @return List of bookings made by the customer
     */
    List<Booking> findByUserEmailOrderByCreatedAtDesc(String userEmail);

    /**
     * Retrieves bookings within a specific date range
     * Useful for generating reports and analytics
     * @param startDate Beginning of the date range
     * @param endDate End of the date range
     * @return List of bookings within the specified date range
     */
    @Query("SELECT b FROM Booking b WHERE b.bookingDate BETWEEN :startDate AND :endDate " +
            "ORDER BY b.bookingDate ASC")
    List<Booking> findBookingsByDateRange(
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );

    /**
     * Counts total number of confirmed bookings for analytics
     * Excludes cancelled bookings from the count
     * @return Total count of confirmed bookings
     */
    @Query("SELECT COUNT(b) FROM Booking b WHERE b.status = 'CONFIRMED'")
    Long countConfirmedBookings();
}
