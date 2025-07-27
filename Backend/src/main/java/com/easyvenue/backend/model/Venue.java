package com.easyvenue.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

/**
 * Entity representing a venue available for booking
 * Contains venue details, pricing, and availability calendar
 */
@Entity
@Table(name = "venues")
public class Venue {

    /** Unique venue identifier (auto-generated) */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Name of the venue (e.g., "Grand Palace Banquet Hall") */
    @Column(nullable = false, length = 100)
    private String name;

    /** Physical location or address of the venue */
    @Column(nullable = false)
    private String location;

    /** Maximum number of people the venue can accommodate */
    @Column(nullable = false)
    private Integer capacity;

    /** Rental cost per hour in the local currency */
    @Column(nullable = false)
    private Double pricePerHour;

    /** Email of the venue owner or admin who created this venue */
    @Column(nullable = false)
    private String createdBy;

    /** Flag indicating if the venue is active and available for booking */
    @Column(nullable = false)
    private Boolean isActive = true;

    /** List of dates when the venue is unavailable for booking */
    @ElementCollection
    @CollectionTable(name = "venue_unavailable_dates",
            joinColumns = @JoinColumn(name = "venue_id"))
    @Column(name = "unavailable_date")
    private List<LocalDate> unavailableDates = new ArrayList<>();

    /** Timestamp when the venue was first created (auto-generated) */
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    /** Timestamp when the venue was last modified (auto-updated) */
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    /**
     * Default constructor for JPA entity creation
     */
    public Venue() {}

    /**
     * Convenience constructor for creating venues with essential details
     * @param name Venue name
     * @param location Venue address or location
     * @param capacity Maximum occupancy
     * @param pricePerHour Hourly rental rate
     * @param createdBy Email of the venue creator
     */
    public Venue(String name, String location, Integer capacity,
                 Double pricePerHour, String createdBy) {
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.pricePerHour = pricePerHour;
        this.createdBy = createdBy;
    }

    // =============== GETTERS AND SETTERS ===============

    /**
     * Gets the unique venue identifier
     * @return Venue ID (null for new venues)
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the venue identifier (typically not used manually)
     * @param id Unique venue identifier
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets the venue name
     * @return Display name of the venue
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the venue name
     * @param name Display name for the venue (max 100 characters)
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the venue location
     * @return Address or location description
     */
    public String getLocation() {
        return location;
    }

    /**
     * Sets the venue location
     * @param location Physical address or location description
     */
    public void setLocation(String location) {
        this.location = location;
    }

    /**
     * Gets the venue capacity
     * @return Maximum number of people the venue can hold
     */
    public Integer getCapacity() {
        return capacity;
    }

    /**
     * Sets the maximum occupancy for the venue
     * @param capacity Number of people the venue can accommodate
     */
    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    /**
     * Gets the hourly rental rate
     * @return Cost per hour in local currency
     */
    public Double getPricePerHour() {
        return pricePerHour;
    }

    /**
     * Sets the hourly rental rate
     * @param pricePerHour Cost per hour for renting this venue
     */
    public void setPricePerHour(Double pricePerHour) {
        this.pricePerHour = pricePerHour;
    }

    /**
     * Gets the venue creator's identifier
     * @return Email of the person who added this venue
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * Sets the venue creator identifier
     * @param createdBy Email of the venue owner or admin
     */
    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * Checks if the venue is active and available for booking
     * @return True if venue is active, false if deactivated
     */
    public Boolean getIsActive() {
        return isActive;
    }

    /**
     * Sets the active status of the venue
     * @param isActive True to make venue available, false to deactivate
     */
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    /**
     * Gets the list of unavailable dates
     * @return List of dates when venue cannot be booked
     */
    public List<LocalDate> getUnavailableDates() {
        return unavailableDates;
    }

    /**
     * Sets the unavailable dates for this venue
     * @param unavailableDates List of blocked dates
     */
    public void setUnavailableDates(List<LocalDate> unavailableDates) {
        this.unavailableDates = unavailableDates;
    }

    /**
     * Gets the venue creation timestamp
     * @return When this venue was first added to the system
     */
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    /**
     * Gets the last modification timestamp
     * @return When this venue was last updated
     */
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    // =============== UTILITY METHODS ===============

    /**
     * Checks if the venue is available on a specific date
     * @param date Date to check availability for
     * @return True if available, false if blocked or inactive
     */
    public boolean isAvailableOn(LocalDate date) {
        return isActive && (unavailableDates == null || !unavailableDates.contains(date));
    }

    /**
     * Adds a date to the unavailable dates list
     * @param date Date to block from booking
     */
    public void blockDate(LocalDate date) {
        if (unavailableDates == null) {
            unavailableDates = new ArrayList<>();
        }
        if (!unavailableDates.contains(date)) {
            unavailableDates.add(date);
        }
    }

    /**
     * Removes a date from the unavailable dates list
     * @param date Date to make available for booking
     */
    public void unblockDate(LocalDate date) {
        if (unavailableDates != null) {
            unavailableDates.remove(date);
        }
    }

    /**
     * Provides string representation for debugging and logging
     * @return Formatted string with key venue details
     */
    @Override
    public String toString() {
        return "Venue{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", location='" + location + '\'' +
                ", capacity=" + capacity +
                ", pricePerHour=" + pricePerHour +
                ", isActive=" + isActive +
                ", unavailableDates=" + (unavailableDates != null ? unavailableDates.size() : 0) + " dates" +
                '}';
    }
}
