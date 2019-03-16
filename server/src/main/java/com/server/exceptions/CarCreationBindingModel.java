package com.server.exceptions;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

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


    @Length(min=3,max = 15)
    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }


    @Length(min=1,max = 15)
    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    @Length(min=10, max=500)
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @NotNull
    @Min(1)
    public Integer getTrunkCapacity() {
        return trunkCapacity;
    }

    public void setTrunkCapacity(Integer trunkCapacity) {
        this.trunkCapacity = trunkCapacity;
    }

    @NotNull
    @Min(1)
    public Integer getSeats() {
        return seats;
    }

    public void setSeats(Integer seats) {
        this.seats = seats;
    }

    @NotNull
    @Min(1)
    public Integer getYear() {
        return year;
    }

    public void setYear(Integer year) {
        this.year = year;
    }

    @NotEmpty
    @Length(min = 14)
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @NotNull
    @DecimalMin("0.1")
    public Double getLitersPerHundredKilometers() {
        return litersPerHundredKilometers;
    }

    public void setLitersPerHundredKilometers(Double litersPerHundredKilometers) {
        this.litersPerHundredKilometers = litersPerHundredKilometers;
    }

    @NotNull
    @DecimalMin("0.1")
    public Double getPricePerDay() {
        return pricePerDay;
    }

    public void setPricePerDay(Double pricePerDay) {
        this.pricePerDay = pricePerDay;
    }

    @NotNull
    @Min(1)
    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
