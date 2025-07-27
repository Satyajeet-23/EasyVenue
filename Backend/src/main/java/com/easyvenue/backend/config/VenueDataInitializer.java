package com.easyvenue.backend.config;

import com.easyvenue.backend.model.Venue;
import com.easyvenue.backend.repository.VenueRepository;
import com.easyvenue.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.ArrayList;
import java.util.List;

/**
 * Data initialization component for seeding venue data
 * Runs automatically on application startup to populate database with sample venues
 * Only executes if database is empty to preserve existing data and bookings
 */
@Component
public class VenueDataInitializer implements CommandLineRunner {

    @Autowired
    private VenueRepository venueRepository;

    @Autowired
    private BookingRepository bookingRepository;

    /**
     * Executes data initialization logic on application startup
     * Checks database state and conditionally seeds venue data
     * Preserves existing bookings by only running when database is empty
     * @param args Command line arguments (not used)
     * @throws Exception if database operations fail
     */
    @Override
    public void run(String... args) throws Exception {
        if (shouldInitializeData()) {
            performDataInitialization();
        } else {
            displayExistingDataStats();
        }
    }

    /**
     * Determines if data initialization should proceed
     * Only initializes when no venues exist to prevent data loss
     * @return True if database is empty and needs initialization
     */
    private boolean shouldInitializeData() {
        return venueRepository.count() == 0;
    }

    /**
     * Performs the complete data initialization process
     * Creates and saves all sample venues with their availability calendars
     */
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

    /**
     * Displays statistics about existing data in the database
     * Helpful for monitoring data state during development
     */
    private void displayExistingDataStats() {
        System.out.println("📊 Database already contains data. Skipping initialization.");
        System.out.println("🏢 Total venues: " + venueRepository.count());
        System.out.println("📅 Total bookings: " + bookingRepository.count());
        System.out.println("✨ Preserving existing test data for continued development.");
    }

    /**
     * Creates and saves all sample venues to the database
     * Includes venues from different Indian cities with varied pricing and availability
     */
    private void initializeVenues() {
        List<Venue> venues = createSampleVenues();
        venueRepository.saveAll(venues);
        System.out.println("🏢 Successfully created " + venues.size() + " sample venues");
    }

    /**
     * Builds the complete list of sample venues for the application
     * Includes diverse venues across major Indian cities with realistic pricing
     * @return List of configured venue entities ready for database insertion
     */
    private List<Venue> createSampleVenues() {
        return Arrays.asList(
                // Premium venues with higher capacity and pricing
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

                // Mid-range venues with moderate pricing
                createVenue("Sunset Rooftop", "Pune", 80, 2500.0,
                        Arrays.asList(LocalDate.of(2025, 7, 20))),

                createVenue("Green Garden Venue", "Nagpur", 120, 3000.0,
                        new ArrayList<>()),

                createVenue("White Pearl Banquet", "Ahmedabad", 110, 3300.0,
                        new ArrayList<>()),

                createVenue("Velvet Lounge", "Jaipur", 130, 3400.0,
                        new ArrayList<>()),

                createVenue("Palm Valley Hall", "Kolkata", 160, 3600.0,
                        Arrays.asList(LocalDate.of(2025, 7, 22))),

                createVenue("Amber Palace", "Udaipur", 140, 3900.0,
                        new ArrayList<>()),

                createVenue("Cityscape Terrace", "Noida", 100, 3200.0,
                        new ArrayList<>()),

                createVenue("Serene Valley", "Nashik", 105, 3100.0,
                        new ArrayList<>()),

                createVenue("Moonlight Venue", "Lucknow", 125, 3300.0,
                        new ArrayList<>()),

                // Budget-friendly venues with competitive pricing
                createVenue("Heritage Courtyard", "Hyderabad", 90, 2800.0,
                        new ArrayList<>()),

                createVenue("Urban Nest", "Indore", 75, 2100.0,
                        new ArrayList<>()),

                createVenue("Blue Lagoon Hall", "Thane", 95, 2700.0,
                        new ArrayList<>()),

                createVenue("Harmony Hall", "Surat", 115, 2950.0,
                        Arrays.asList(LocalDate.of(2025, 7, 23)))
        );
    }

    /**
     * Creates a single venue entity with specified details and availability
     * Sets default values for common properties and validates input data
     * @param name Display name of the venue
     * @param location City or area where venue is located
     * @param capacity Maximum number of people venue can accommodate
     * @param pricePerHour Hourly rental rate in local currency
     * @param unavailableDates List of dates when venue is blocked for booking
     * @return Configured venue entity ready for database persistence
     */
    private Venue createVenue(String name, String location, Integer capacity,
                              Double pricePerHour, List<LocalDate> unavailableDates) {
        Venue venue = new Venue();

        // Set core venue properties
        venue.setName(name);
        venue.setLocation(location);
        venue.setCapacity(capacity);
        venue.setPricePerHour(pricePerHour);

        // Set default administrative properties
        venue.setCreatedBy("admin@eazyvenue.com");
        venue.setIsActive(true);

        // Initialize availability calendar
        venue.setUnavailableDates(unavailableDates != null ? unavailableDates : new ArrayList<>());

        return venue;
    }
}
