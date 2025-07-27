package com.easyvenue.backend.controller;

import com.easyvenue.backend.dto.AvailabilityUpdateRequest;
import com.easyvenue.backend.model.Venue;
import com.easyvenue.backend.service.impl.VenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for managing venue operations
 * Handles venue CRUD operations and availability management
 */
@RestController
@RequestMapping("/api/venues")
@CrossOrigin(origins = "*")
public class VenueController {

    @Autowired
    private VenueService venueService;

    /**
     * Retrieves all active venues available for booking
     * @return List of all venues ordered by creation date
     */
    @GetMapping
    public List<Venue> getAllVenues() {
        return venueService.getAllVenues();
    }

    /**
     * Creates a new venue in the system
     * @param venue Venue details including name, location, capacity, and pricing
     * @return Created venue with generated ID
     */
    @PostMapping
    public Venue createVenue(@RequestBody Venue venue) {
        return venueService.createVenue(venue);
    }

    /**
     * Retrieves detailed information for a specific venue
     * @param id Venue identifier
     * @return Venue details or 404 if venue not found
     */
    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
        return venueService.getVenueById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Softly deletes a venue by marking it as inactive
     * @param id Venue identifier to deactivate
     * @return 204 No Content on successful deactivation
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVenue(@PathVariable Long id) {
        venueService.deleteVenue(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Updates venue information (name, location, capacity, pricing)
     * @param id Venue identifier to update
     * @param updatedVenue New venue information
     * @return Updated venue details or 404 if venue not found
     */
    @PutMapping("/{id}")
    public ResponseEntity<Venue> updateVenue(@PathVariable Long id,
                                             @RequestBody Venue updatedVenue) {
        try {
            Venue updated = venueService.updateVenue(id, updatedVenue);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            // Handle case where venue ID doesn't exist
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Manages venue availability by blocking or unblocking specific dates
     * Used by venue owners to control when their venue can be booked
     * @param id Venue identifier to update availability for
     * @param request Contains dates to block and dates to unblock
     * @return Updated venue with new availability calendar or error if venue not found
     */
    @PutMapping("/{id}/availability")
    public ResponseEntity<Venue> updateAvailability(@PathVariable Long id,
                                                    @RequestBody AvailabilityUpdateRequest request) {
        try {
            Venue updated = venueService.updateAvailability(
                    id,
                    request.getBlockDates(),
                    request.getUnblockDates()
            );
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            // Handle invalid venue ID or availability update failure
            return ResponseEntity.badRequest().build();
        }
    }
}
