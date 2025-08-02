package com.easyvenue.backend.service.impl;

import com.easyvenue.backend.model.Venue;
import com.easyvenue.backend.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class VenueService {

    @Autowired
    private VenueRepository venueRepository;

    public List<Venue> getAllVenues() {
        return venueRepository.findByIsActiveTrueOrderByCreatedAtDesc();
    }

    public Venue createVenue(Venue venue) {
        if (venue.getIsActive() == null) {
            venue.setIsActive(true);
        }

        return venueRepository.save(venue);
    }

    public Optional<Venue> getVenueById(Long id) {
        return venueRepository.findById(id)
                .filter(Venue::getIsActive);
    }

    public void deleteVenue(Long id) {
        Optional<Venue> venue = venueRepository.findById(id);
        if (venue.isPresent()) {
            venue.get().setIsActive(false);
            venueRepository.save(venue.get());
        }
    }

    public Venue updateVenue(Long id, Venue updatedVenue) {
        return venueRepository.findById(id)
                .map(existingVenue -> {
                    existingVenue.setName(updatedVenue.getName());
                    existingVenue.setLocation(updatedVenue.getLocation());
                    existingVenue.setCapacity(updatedVenue.getCapacity());
                    existingVenue.setPricePerHour(updatedVenue.getPricePerHour());

                    return venueRepository.save(existingVenue);
                })
                .orElseThrow(() -> new RuntimeException("Venue not found with ID: " + id));
    }

    public Venue updateAvailability(Long id, List<LocalDate> blockDates, List<LocalDate> unblockDates) {
        return venueRepository.findById(id)
                .map(venue -> {
                    Set<LocalDate> unavailableSet = new HashSet<>(venue.getUnavailableDates());

                    if (blockDates != null && !blockDates.isEmpty()) {
                        unavailableSet.addAll(blockDates);
                        System.out.println("🚫 Blocked " + blockDates.size() + " dates for venue: " + venue.getName());
                    }

                    if (unblockDates != null && !unblockDates.isEmpty()) {
                        unavailableSet.removeAll(unblockDates);
                        System.out.println("✅ Unblocked " + unblockDates.size() + " dates for venue: " + venue.getName());
                    }

                    venue.setUnavailableDates(List.copyOf(unavailableSet));
                    return venueRepository.save(venue);
                })
                .orElseThrow(() -> new RuntimeException("Venue not found with ID: " + id));
    }


    public boolean isVenueAvailable(Long venueId, LocalDate date) {
        Optional<Venue> venue = getVenueById(venueId);
        return venue.isPresent() && venue.get().isAvailableOn(date);
    }

    public List<Venue> getVenuesByLocation(String location) {
        return venueRepository.findActiveVenuesByLocation(location);
    }

    public List<Venue> getVenuesByCapacityRange(Integer minCapacity, Integer maxCapacity) {
        return venueRepository.findActiveVenuesByCapacityRange(minCapacity, maxCapacity);
    }

    public List<Venue> getVenuesByPriceRange(Double minPrice, Double maxPrice) {
        return venueRepository.findActiveVenuesByPriceRange(minPrice, maxPrice);
    }
}
