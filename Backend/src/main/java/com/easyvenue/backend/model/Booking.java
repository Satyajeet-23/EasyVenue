package com.easyvenue.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.time.LocalDate;

/**
 * Entity representing a venue booking record
 * Stores customer booking information and links to the booked venue
 */
@Entity
@Table(name = "bookings")
public class Booking {

    /** Unique booking identifier (auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Reference to the booked venue with eager loading for API responses */
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;

    /** Full name of the customer making the booking */
    @Column(nullable = false)
    private String userName;

    /** Customer's email for booking confirmation and communication */
    @Column(nullable = false)
    private String userEmail;

    /** Date when the venue will be used for the event */
    @Column(nullable = false)
    private LocalDate bookingDate;

    /** Duration of venue rental in hours */
    @Column(nullable = false)
    private Integer hoursBooked;

    /** Current status of the booking (confirmed or cancelled) */
    @Enumerated(EnumType.STRING)
    private BookingStatus status = BookingStatus.CONFIRMED;

    /** Total amount to be paid for the booking */
    @Column(nullable = false)
    private Double totalCost;

    /** Timestamp when the booking was created (auto-generated) */
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    /**
     * Enumeration for booking status values
     * Determines whether a booking is active or has been cancelled
     */
    public enum BookingStatus {
        /** Booking is confirmed and active */
        CONFIRMED,
        /** Booking has been cancelled by customer or admin */
        CANCELLED
    }

    /**
     * Default constructor for JPA entity creation
     */
    public Booking() {}

    /**
     * Convenience constructor for creating bookings with essential details
     * @param venue The venue being booked
     * @param userName Customer's full name
     * @param userEmail Customer's email address
     * @param bookingDate Date of the event
     * @param hoursBooked Duration in hours
     * @param totalCost Total amount for the booking
     */
    public Booking(Venue venue, String userName, String userEmail,
                   LocalDate bookingDate, Integer hoursBooked, Double totalCost) {
        this.venue = venue;
        this.userName = userName;
        this.userEmail = userEmail;
        this.bookingDate = bookingDate;
        this.hoursBooked = hoursBooked;
        this.totalCost = totalCost;
    }

    // =============== GETTERS AND SETTERS ===============

    /**
     * Gets the unique booking identifier
     * @return Booking ID (null for new bookings)
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the booking identifier (typically not used manually)
     * @param id Unique booking identifier
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets the venue associated with this booking
     * @return Venue entity with all details
     */
    public Venue getVenue() {
        return venue;
    }

    /**
     * Associates this booking with a specific venue
     * @param venue The venue being booked
     */
    public void setVenue(Venue venue) {
        this.venue = venue;
    }

    /**
     * Gets the customer's name
     * @return Full name of the person who made the booking
     */
    public String getUserName() {
        return userName;
    }

    /**
     * Sets the customer's name for the booking
     * @param userName Customer's full name
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * Gets the customer's email address
     * @return Email used for booking confirmation
     */
    public String getUserEmail() {
        return userEmail;
    }

    /**
     * Sets the customer's email for communication
     * @param userEmail Valid email address
     */
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    /**
     * Gets the event date for this booking
     * @return Date when the venue will be used
     */
    public LocalDate getBookingDate() {
        return bookingDate;
    }

    /**
     * Sets the date for the venue usage
     * @param bookingDate Event date
     */
    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    /**
     * Gets the duration of venue rental
     * @return Number of hours the venue is booked
     */
    public Integer getHoursBooked() {
        return hoursBooked;
    }

    /**
     * Sets the rental duration
     * @param hoursBooked Number of hours (typically 1-12)
     */
    public void setHoursBooked(Integer hoursBooked) {
        this.hoursBooked = hoursBooked;
    }

    /**
     * Gets the current booking status
     * @return Status indicating if booking is confirmed or cancelled
     */
    public BookingStatus getStatus() {
        return status;
    }

    /**
     * Updates the booking status
     * @param status New status for the booking
     */
    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    /**
     * Gets the total cost for this booking
     * @return Amount to be paid (calculated as hours × venue price per hour)
     */
    public Double getTotalCost() {
        return totalCost;
    }

    /**
     * Sets the total cost for the booking
     * @param totalCost Amount calculated based on hours and venue pricing
     */
    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    /**
     * Gets the timestamp when this booking was created
     * @return Creation timestamp (auto-generated by Hibernate)
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * Provides string representation for debugging and logging
     * @return Formatted string with key booking details
     */
    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", venue=" + (venue != null ? venue.getName() : "null") +
                ", userName='" + userName + '\'' +
                ", bookingDate=" + bookingDate +
                ", hoursBooked=" + hoursBooked +
                ", status=" + status +
                ", totalCost=" + totalCost +
                '}';
    }
}
