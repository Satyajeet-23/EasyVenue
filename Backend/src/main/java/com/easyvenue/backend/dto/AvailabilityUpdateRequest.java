package com.easyvenue.backend.dto;

import java.time.LocalDate;
import java.util.List;

public class AvailabilityUpdateRequest {

    private List<LocalDate> blockDates;

    private List<LocalDate> unblockDates;

    public AvailabilityUpdateRequest() {
    }

    public AvailabilityUpdateRequest(List<LocalDate> blockDates, List<LocalDate> unblockDates) {
        this.blockDates = blockDates;
        this.unblockDates = unblockDates;
    }

    public List<LocalDate> getBlockDates() {
        return blockDates;
    }

    public void setBlockDates(List<LocalDate> blockDates) {
        this.blockDates = blockDates;
    }

    public List<LocalDate> getUnblockDates() {
        return unblockDates;
    }

    public void setUnblockDates(List<LocalDate> unblockDates) {
        this.unblockDates = unblockDates;
    }

    @Override
    public String toString() {
        return "AvailabilityUpdateRequest{" +
                "blockDates=" + (blockDates != null ? blockDates.size() : 0) + " dates" +
                ", unblockDates=" + (unblockDates != null ? unblockDates.size() : 0) + " dates" +
                '}';
    }
}
