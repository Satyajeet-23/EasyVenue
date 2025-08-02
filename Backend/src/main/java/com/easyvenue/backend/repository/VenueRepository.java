package com.easyvenue.backend.repository;

import com.easyvenue.backend.model.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {

    List<Venue> findByIsActiveTrueOrderByCreatedAtDesc();

    @Query("SELECT v FROM Venue v WHERE v.isActive = true ORDER BY v.createdAt DESC")
    List<Venue> findAllActiveVenues();

    @Query("SELECT v FROM Venue v WHERE v.isActive = true " +
            "AND LOWER(v.location) LIKE LOWER(CONCAT('%', :location, '%')) " +
            "ORDER BY v.name ASC")
    List<Venue> findActiveVenuesByLocation(@Param("location") String location);

    @Query("SELECT v FROM Venue v WHERE v.isActive = true " +
            "AND v.capacity BETWEEN :minCapacity AND :maxCapacity " +
            "ORDER BY v.capacity ASC")
    List<Venue> findActiveVenuesByCapacityRange(
            @Param("minCapacity") Integer minCapacity,
            @Param("maxCapacity") Integer maxCapacity
    );

    @Query("SELECT v FROM Venue v WHERE v.isActive = true " +
            "AND v.pricePerHour BETWEEN :minPrice AND :maxPrice " +
            "ORDER BY v.pricePerHour ASC")
    List<Venue> findActiveVenuesByPriceRange(
            @Param("minPrice") Double minPrice,
            @Param("maxPrice") Double maxPrice
    );

    List<Venue> findByCreatedByOrderByCreatedAtDesc(String createdBy);

    @Query("SELECT v FROM Venue v WHERE LOWER(v.name) = LOWER(:name)")
    Optional<Venue> findByNameIgnoreCase(@Param("name") String name);

    @Query("SELECT COUNT(v) FROM Venue v WHERE v.isActive = true")
    Long countActiveVenues();
}
