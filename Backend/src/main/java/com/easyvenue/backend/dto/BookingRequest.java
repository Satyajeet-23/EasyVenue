package com.easyvenue.backend.dto;

import java.time.LocalDate;

public class BookingRequest {

    private Long venueId;

    private String userName;

    private String userEmail;

    private LocalDate bookingDate;

    private Integer hoursBooked;

    public BookingRequest() {
    }

    public BookingRequest(Long venueId, String userName, String userEmail,
                          LocalDate bookingDate, Integer hoursBooked) {
        this.venueId = venueId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.bookingDate = bookingDate;
        this.hoursBooked = hoursBooked;
    }

    public Long getVenueId() {
        return venueId;
    }

    public void setVenueId(Long venueId) {
        this.venueId = venueId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public LocalDate getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(LocalDate bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Integer getHoursBooked() {
        return hoursBooked;
    }

    public void setHoursBooked(Integer hoursBooked) {
        this.hoursBooked = hoursBooked;
    }

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
