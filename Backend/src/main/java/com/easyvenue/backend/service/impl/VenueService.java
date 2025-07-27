package com.easyvenue.backend.service.impl;

import com.easyvenue.backend.model.Venue;
import com.easyvenue.backend.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.HashSet;

/**
 * Service layer for managing venue operations
 * Handles venue CRUD operations, availability management, and business logic
 */
@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    /**
     * Retrieves all active venues available for booking
     * Excludes soft-deleted venues and returns results in newest-first order
     * @return List of active venues sorted by creation date
     */
    public List<Venue> getAllVenues() {
        return venueRepository.findByIsActiveTrueOrderByCreatedAtDesc();
    }

    /**
     * Creates a new venue in the system
     * Sets default values and validates venue information before saving
     * @param venue Venue entity with name, location, capacity, and pricing details
     * @return Saved venue with generated ID and timestamps
     */
    public Venue createVenue(Venue venue) {
        // Business logic: Set default active status if not specified
        if (venue.getIsActive() == null) {
            venue.setIsActive(true);
        }

        return venueRepository.save(venue);
    }

    /**
     * Retrieves detailed information for a specific venue
     * Only returns active venues to prevent access to soft-deleted records
     * @param id Unique venue identifier
     * @return Optional containing venue details if found and active
     */
    public Optional<Venue> getVenueById(Long id) {
        return venueRepository.findById(id)
                .filter(Venue::getIsActive);
    }

    /**
     * Soft deletes a venue by marking it as inactive
     * Preserves venue data for historical bookings while hiding from public view
     * @param id Venue identifier to deactivate
     */
    public void deleteVenue(Long id) {
        Optional<Venue> venue = venueRepository.findById(id);
        if (venue.isPresent()) {
            venue.get().setIsActive(false);
            venueRepository.save(venue.get());
        }
    }

    /**
     * Updates venue information including name, location, capacity, and pricing
     * Does not modify availability calendar or active status
     * @param id Venue identifier to update
     * @param updatedVenue New venue information
     * @return Updated venue entity with preserved metadata
     * @throws RuntimeException if venue with given ID doesn't exist
     */
    public Venue updateVenue(Long id, Venue updatedVenue) {
        return venueRepository.findById(id)
                .map(existingVenue -> {
                    // Update core venue properties
                    existingVenue.setName(updatedVenue.getName());
                    existingVenue.setLocation(updatedVenue.getLocation());
                    existingVenue.setCapacity(updatedVenue.getCapacity());
                    existingVenue.setPricePerHour(updatedVenue.getPricePerHour());

                    return venueRepository.save(existingVenue);
                })
                .orElseThrow(() -> new RuntimeException("Venue not found with ID: " + id));
    }

    /**
     * Manages venue availability by blocking or unblocking specific dates
     * Used by venue owners to control when their venue can be booked
     * Handles both adding blocked dates and removing previously blocked dates
     * @param id Venue identifier to update availability for
     * @param blockDates List of dates to mark as unavailable
     * @param unblockDates List of dates to make available again
     * @return Updated venue with modified availability calendar
     * @throws RuntimeException if venue with given ID doesn't exist
     */
    public Venue updateAvailability(Long id, List<LocalDate> blockDates, List<LocalDate> unblockDates) {
        return venueRepository.findById(id)
                .map(venue -> {
                    // Use Set for efficient date operations
                    Set<LocalDate> unavailableSet = new HashSet<>(venue.getUnavailableDates());

                    // Process dates to block from booking
                    if (blockDates != null && !blockDates.isEmpty()) {
                        unavailableSet.addAll(blockDates);
                        System.out.println("🚫 Blocked " + blockDates.size() + " dates for venue: " + venue.getName());
                    }

                    // Process dates to make available for booking
                    if (unblockDates != null && !unblockDates.isEmpty()) {
                        unavailableSet.removeAll(unblockDates);
                        System.out.println("✅ Unblocked " + unblockDates.size() + " dates for venue: " + venue.getName());
                    }

                    // Update venue with modified availability calendar
                    venue.setUnavailableDates(List.copyOf(unavailableSet));
                    return venueRepository.save(venue);
                })
                .orElseThrow(() -> new RuntimeException("Venue not found with ID: " + id));
    }

    // =============== UTILITY METHODS ===============

    /**
     * Checks if a venue is available for booking on a specific date
     * Considers both venue-level blocks and existing bookings
     * @param venueId Venue identifier to check
     * @param date Date to validate availability for
     * @return True if venue is available, false if blocked or booked
     */
    public boolean isVenueAvailable(Long venueId, LocalDate date) {
        Optional<Venue> venue = getVenueById(venueId);
        return venue.isPresent() && venue.get().isAvailableOn(date);
    }

    /**
     * Retrieves venues filtered by location
     * Supports partial matching for flexible search functionality
     * @param location Location name or partial string to search for
     * @return List of venues matching the location criteria
     */
    public List<Venue> getVenuesByLocation(String location) {
        return venueRepository.findActiveVenuesByLocation(location);
    }

    /**
     * Finds venues within a specific capacity range
     * Useful for filtering venues based on event size requirements
     * @param minCapacity Minimum required capacity
     * @param maxCapacity Maximum acceptable capacity
     * @return List of venues within the capacity range
     */
    public List<Venue> getVenuesByCapacityRange(Integer minCapacity, Integer maxCapacity) {
        return venueRepository.findActiveVenuesByCapacityRange(minCapacity, maxCapacity);
    }

    /**
     * Retrieves venues within a specific price range
     * Helps customers filter venues based on budget constraints
     * @param minPrice Minimum acceptable price per hour
     * @param maxPrice Maximum acceptable price per hour
     * @return List of venues within the price range
     */
    public List<Venue> getVenuesByPriceRange(Double minPrice, Double maxPrice) {
        return venueRepository.findActiveVenuesByPriceRange(minPrice, maxPrice);
    }
}
