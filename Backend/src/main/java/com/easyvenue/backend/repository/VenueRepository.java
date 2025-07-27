package com.easyvenue.backend.repository;

import com.easyvenue.backend.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository interface for managing venue data operations
 * Provides database access methods for venue-related queries
 * Extends JpaRepository for standard CRUD operations
 */
@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {

    /**
     * Retrieves all active venues ordered by creation date
     * Shows newest venues first, excludes soft-deleted venues
     * Used for public venue listing and admin venue management
     * @return List of active venues sorted by creation timestamp (newest first)
     */
    List<Venue> findByIsActiveTrueOrderByCreatedAtDesc();

    /**
     * Alternative method to find all active venues
     * Functionally equivalent to findByIsActiveTrueOrderByCreatedAtDesc()
     * but uses explicit JPQL query for clarity
     * @return List of all venues where isActive flag is true
     */
    @Query("SELECT v FROM Venue v WHERE v.isActive = true ORDER BY v.createdAt DESC")
    List<Venue> findAllActiveVenues();

    /**
     * Finds venues by location for location-based searches
     * Supports partial matching for flexible location queries
     * @param location Location name or partial location string
     * @return List of active venues matching the location criteria
     */
    @Query("SELECT v FROM Venue v WHERE v.isActive = true " +
            "AND LOWER(v.location) LIKE LOWER(CONCAT('%', :location, '%')) " +
            "ORDER BY v.name ASC")
    List<Venue> findActiveVenuesByLocation(@Param("location") String location);

    /**
     * Retrieves venues within a specific capacity range
     * Useful for filtering venues based on event size requirements
     * @param minCapacity Minimum required capacity
     * @param maxCapacity Maximum acceptable capacity
     * @return List of venues within the specified capacity range
     */
    @Query("SELECT v FROM Venue v WHERE v.isActive = true " +
            "AND v.capacity BETWEEN :minCapacity AND :maxCapacity " +
            "ORDER BY v.capacity ASC")
    List<Venue> findActiveVenuesByCapacityRange(
            @Param("minCapacity") Integer minCapacity,
            @Param("maxCapacity") Integer maxCapacity
    );

    /**
     * Finds venues within a specific price range
     * Helps customers filter venues based on budget constraints
     * @param minPrice Minimum acceptable price per hour
     * @param maxPrice Maximum acceptable price per hour
     * @return List of venues within the specified price range
     */
    @Query("SELECT v FROM Venue v WHERE v.isActive = true " +
            "AND v.pricePerHour BETWEEN :minPrice AND :maxPrice " +
            "ORDER BY v.pricePerHour ASC")
    List<Venue> findActiveVenuesByPriceRange(
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice
    );

    /**
     * Retrieves all venues created by a specific user
     * Used by venue owners to manage their own venues
     * @param createdBy Email address of the venue creator
     * @return List of venues created by the specified user
     */
    List<Venue> findByCreatedByOrderByCreatedAtDesc(String createdBy);

    /**
     * Finds venue by exact name match (case-insensitive)
     * Useful for preventing duplicate venue names
     * @param name Exact venue name to search for
     * @return Optional containing the venue if found, empty otherwise
     */
    @Query("SELECT v FROM Venue v WHERE LOWER(v.name) = LOWER(:name)")
    Optional<Venue> findByNameIgnoreCase(@Param("name") String name);

    /**
     * Counts total number of active venues for statistics
     * Excludes soft-deleted venues from the count
     * @return Total count of active venues in the system
     */
    @Query("SELECT COUNT(v) FROM Venue v WHERE v.isActive = true")
    Long countActiveVenues();
}
