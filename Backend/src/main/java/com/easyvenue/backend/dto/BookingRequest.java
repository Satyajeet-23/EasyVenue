package com.easyvenue.backend.dto;

import java.time.LocalDate;

/**
 * Data Transfer Object for creating new venue bookings
 * Contains all necessary information for processing a booking request
 */
public class BookingRequest {

    /** Unique identifier of the venue to be booked */
    private Long venueId;

    /** Full name of the person making the booking */
    private String userName;

    /** Email address for booking confirmation and communication */
    private String userEmail;

    /** Date when the venue will be used for the event */
    private LocalDate bookingDate;

    /** Number of hours the venue will be reserved */
    private Integer hoursBooked;

    /**
     * Default constructor for JSON deserialization
     */
    public BookingRequest() {}

    /**
     * Parametrized constructor for easier object creation
     * @param venueId ID of the venue to book
     * @param userName Name of the person booking
     * @param userEmail Email for confirmation
     * @param bookingDate Date of the event
     * @param hoursBooked Duration of venue usage in hours
     */
    public BookingRequest(Long venueId, String userName, String userEmail,
                          LocalDate bookingDate, Integer hoursBooked) {
        this.venueId = venueId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.bookingDate = bookingDate;
        this.hoursBooked = hoursBooked;
    }

    /**
     * Gets the venue identifier for the booking
     * @return Venue ID that will be booked
     */
    public Long getVenueId() {
        return venueId;
    }

    /**
     * Sets the venue to be booked
     * @param venueId Unique venue identifier
     */
    public void setVenueId(Long venueId) {
        this.venueId = venueId;
    }

    /**
     * Gets the customer's full name
     * @return Name of the person making the booking
     */
    public String getUserName() {
        return userName;
    }

    /**
     * Sets the customer's name for the booking
     * @param userName Full name of the booking requester
     */
    public void setUserName(String userName) {
        this.userName = userName;
    }

    /**
     * Gets the customer's email address
     * @return Email for booking confirmation and updates
     */
    public String getUserEmail() {
        return userEmail;
    }

    /**
     * Sets the customer's email for communication
     * @param userEmail Valid email address for confirmation
     */
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    /**
     * Gets the event date for the booking
     * @return Date when the venue will be used
     */
    public LocalDate getBookingDate() {
        return bookingDate;
    }

    /**
     * Sets the date for the venue booking
     * @param bookingDate Date of the planned event
     */
    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    /**
     * Gets the duration of venue rental
     * @return Number of hours the venue will be reserved
     */
    public Integer getHoursBooked() {
        return hoursBooked;
    }

    /**
     * Sets the rental duration for the venue
     * @param hoursBooked Number of hours to reserve (1-12 typically)
     */
    public void setHoursBooked(Integer hoursBooked) {
        this.hoursBooked = hoursBooked;
    }

    /**
     * Provides string representation for debugging and logging
     * @return Formatted string with all booking request details
     */
    @Override
    public String toString() {
        return "BookingRequest{" +
                "venueId=" + venueId +
                ", userName='" + userName + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", bookingDate=" + bookingDate +
                ", hoursBooked=" + hoursBooked +
                '}';
    }
}
