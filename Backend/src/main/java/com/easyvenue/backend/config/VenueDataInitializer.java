package com.easyvenue.backend.config;

import com.easyvenue.backend.model.Venue;
import com.easyvenue.backend.repository.BookingRepository;
import com.easyvenue.backend.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class VenueDataInitializer implements CommandLineRunner {

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public void run(String... args) throws Exception {
        if (shouldInitializeData()) {
            performDataInitialization();
        } else {
            displayExistingDataStats();
        }
    }

    private boolean shouldInitializeData() {
        return venueRepository.count() == 0;
    }

    private void performDataInitialization() {
        System.out.println("🏢 Database is empty. Initializing venue data...");

        try {
            initializeVenues();
            System.out.println("✅ Venue data initialized successfully!");
            System.out.println("🎯 Ready for booking process testing!");
        } catch (Exception e) {
            System.err.println("❌ Failed to initialize venue data: " + e.getMessage());
            throw e;
        }
    }

    private void displayExistingDataStats() {
        System.out.println("📊 Database already contains data. Skipping initialization.");
        System.out.println("🏢 Total venues: " + venueRepository.count());
        System.out.println("📅 Total bookings: " + bookingRepository.count());
        System.out.println("✨ Preserving existing test data for continued development.");
    }

    private void initializeVenues() {
        List<Venue> venues = createSampleVenues();
        venueRepository.saveAll(venues);
        System.out.println("🏢 Successfully created " + venues.size() + " sample venues");
    }

    private List<Venue> createSampleVenues() {
        return Arrays.asList(
                createVenue("Skyline Banquet Hall", "Mumbai", 150, 3500.0,
                        Arrays.asList(LocalDate.of(2025, 7, 25), LocalDate.of(2025, 8, 1))),

                createVenue("Royal Orchid Hall", "Delhi", 200, 4000.0,
                        new ArrayList<>()),

                createVenue("The Grand Pavilion", "Bangalore", 180, 4500.0,
                        Arrays.asList(LocalDate.of(2025, 7, 21), LocalDate.of(2025, 7, 28))),

                createVenue("Lotus Convention Center", "Chennai", 300, 6000.0,
                        new ArrayList<>()),

                createVenue("Ocean Breeze", "Goa", 100, 5000.0,
                        new ArrayList<>()),

                createVenue("Sunset Rooftop", "Pune", 80, 2500.0,
                        List.of(LocalDate.of(2025, 7, 20))),

                createVenue("Green Garden Venue", "Nagpur", 120, 3000.0,
                        new ArrayList<>()),

                createVenue("White Pearl Banquet", "Ahmedabad", 110, 3300.0,
                        new ArrayList<>()),

                createVenue("Velvet Lounge", "Jaipur", 130, 3400.0,
                        new ArrayList<>()),

                createVenue("Palm Valley Hall", "Kolkata", 160, 3600.0,
                        List.of(LocalDate.of(2025, 7, 22))),

                createVenue("Amber Palace", "Udaipur", 140, 3900.0,
                        new ArrayList<>()),

                createVenue("Cityscape Terrace", "Noida", 100, 3200.0,
                        new ArrayList<>()),

                createVenue("Serene Valley", "Nashik", 105, 3100.0,
                        new ArrayList<>()),

                createVenue("Moonlight Venue", "Lucknow", 125, 3300.0,
                        new ArrayList<>()),

                createVenue("Heritage Courtyard", "Hyderabad", 90, 2800.0,
                        new ArrayList<>()),

                createVenue("Urban Nest", "Indore", 75, 2100.0,
                        new ArrayList<>()),

                createVenue("Blue Lagoon Hall", "Thane", 95, 2700.0,
                        new ArrayList<>()),

                createVenue("Harmony Hall", "Surat", 115, 2950.0,
                        List.of(LocalDate.of(2025, 7, 23)))
        );
    }

    private Venue createVenue(String name, String location, Integer capacity,
                              Double pricePerHour, List<LocalDate> unavailableDates) {
        Venue venue = new Venue();

        venue.setName(name);
        venue.setLocation(location);
        venue.setCapacity(capacity);
        venue.setPricePerHour(pricePerHour);

        venue.setCreatedBy("Satyajeet Jena");
        venue.setIsActive(true);

        venue.setUnavailableDates(unavailableDates != null ? unavailableDates : new ArrayList<>());

        return venue;
    }
}
