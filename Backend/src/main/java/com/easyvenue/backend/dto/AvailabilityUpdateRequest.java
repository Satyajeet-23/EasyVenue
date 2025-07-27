package com.easyvenue.backend.dto;

import java.time.LocalDate;
import java.util.List;

/**
 * Data Transfer Object for updating venue availability calendar
 * Used by venue owners to block or unblock specific dates
 */
public class AvailabilityUpdateRequest {

    /** List of dates to mark as unavailable for booking */
    private List<LocalDate> blockDates;

    /** List of dates to mark as available for booking */
    private List<LocalDate> unblockDates;

    /**
     * Default constructor for JSON deserialization
     */
    public AvailabilityUpdateRequest() {}

    /**
     * Parametrized constructor for easier object creation
     * @param blockDates Dates to block from booking
     * @param unblockDates Dates to make available for booking
     */
    public AvailabilityUpdateRequest(List<LocalDate> blockDates, List<LocalDate> unblockDates) {
        this.blockDates = blockDates;
        this.unblockDates = unblockDates;
    }

    /**
     * Gets the list of dates to be blocked
     * @return List of dates to mark as unavailable, or null if none specified
     */
    public List<LocalDate> getBlockDates() {
        return blockDates;
    }

    /**
     * Sets the dates to be blocked from booking
     * @param blockDates List of dates to mark as unavailable
     */
    public void setBlockDates(List<LocalDate> blockDates) {
        this.blockDates = blockDates;
    }

    /**
     * Gets the list of dates to be unblocked
     * @return List of dates to mark as available, or null if none specified
     */
    public List<LocalDate> getUnblockDates() {
        return unblockDates;
    }

    /**
     * Sets the dates to be unblocked for booking
     * @param unblockDates List of dates to mark as available
     */
    public void setUnblockDates(List<LocalDate> unblockDates) {
        this.unblockDates = unblockDates;
    }

    /**
     * Provides string representation for debugging and logging
     * @return Formatted string with block and unblock date counts
     */
    @Override
    public String toString() {
        return "AvailabilityUpdateRequest{" +
                "blockDates=" + (blockDates != null ? blockDates.size() : 0) + " dates" +
                ", unblockDates=" + (unblockDates != null ? unblockDates.size() : 0) + " dates" +
                '}';
    }
}
