package com.server.domain.entities;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cars")
public class Car extends BaseEntity{

    private String brand;
    private String model;
    private String color;
    private String description;
    private String imageUrl;
    private Double litersPerHundredKilometers;
    private Double pricePerDay;
    private Integer count;
    private Set<Rent> activeRents;

    public Car() {
        this.activeRents = new HashSet<>();
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Double getLitersPerHundredKilometers() {
        return litersPerHundredKilometers;
    }

    public void setLitersPerHundredKilometers(Double litersPerHundredKilometers) {
        this.litersPerHundredKilometers = litersPerHundredKilometers;
    }

    public Double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(Double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    @OneToMany(mappedBy = "car")
    public Set<Rent> getActiveRents() {
        return activeRents;
    }

    public void setActiveRents(Set<Rent> activeRents) {
        this.activeRents = activeRents;
    }

    public boolean isAvailable(LocalDate startDate, LocalDate endDate){
        long rents = this.getActiveRents()
                .stream()
                .filter(r -> (!startDate.isBefore(r.getStartDate()) && !startDate.isAfter(r.getEndDate()))
                            || (!endDate.isAfter(r.getEndDate()) && !endDate.isBefore(r.getStartDate()))
                            || (endDate.isAfter(r.getEndDate()) && startDate.isBefore(r.getStartDate())))
                .count();

        return rents < this.getCount();
    }
}
