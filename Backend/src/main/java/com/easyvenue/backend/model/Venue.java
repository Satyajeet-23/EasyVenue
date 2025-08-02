package com.easyvenue.backend.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "venues")
public class Venue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false)
    private Integer capacity;

    @Column(nullable = false)
    private Double pricePerHour;

    @Column(nullable = false)
    private String createdBy;

    @Column(nullable = false)
    private Boolean isActive = true;

    @ElementCollection (fetch = FetchType.EAGER)
    @CollectionTable(name = "venue_unavailable_dates",
            joinColumns = @JoinColumn(name = "venue_id"))
    @Column(name = "unavailable_date")
    private List<LocalDate> unavailableDates = new ArrayList<>();

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    public Venue() {
    }

    public Venue(String name, String location, Integer capacity,
                 Double pricePerHour, String createdBy) {
        this.name = name;
        this.location = location;
        this.capacity = capacity;
        this.pricePerHour = pricePerHour;
        this.createdBy = createdBy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Double getPricePerHour() {
        return pricePerHour;
    }

    public void setPricePerHour(Double pricePerHour) {
        this.pricePerHour = pricePerHour;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public List<LocalDate> getUnavailableDates() {
        return unavailableDates;
    }

    public void setUnavailableDates(List<LocalDate> unavailableDates) {
        this.unavailableDates = unavailableDates;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public boolean isAvailableOn(LocalDate date) {
        return isActive && (unavailableDates == null || !unavailableDates.contains(date));
    }

    public void blockDate(LocalDate date) {
        if (unavailableDates == null) {
            unavailableDates = new ArrayList<>();
        }
        if (!unavailableDates.contains(date)) {
            unavailableDates.add(date);
        }
    }

    public void unblockDate(LocalDate date) {
        if (unavailableDates != null) {
            unavailableDates.remove(date);
        }
    }

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
