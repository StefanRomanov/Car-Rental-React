package com.server.domain.models;

public class CarCreationBindingModel {
    private String brand;
    private String model;
    private Integer trunkCapacity;
    private Integer seats;
    private Integer year;
    private String description;
    private String imageUrl;
    private Double litersPerHundredKilometers;
    private Double pricePerDay;
    private Integer count;

    public CarCreationBindingModel() {
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

    public Integer getTrunkCapacity() {
        return trunkCapacity;
    }

    public void setTrunkCapacity(Integer trunkCapacity) {
        this.trunkCapacity = trunkCapacity;
    }

    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
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
}
