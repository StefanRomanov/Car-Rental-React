package com.server.domain.models;

import com.server.domain.entities.Car;

import java.time.LocalDate;

public class RentCreateBindingModel {
    private LocalDate startDate;
    private LocalDate endDate;
    private Car car;
    private boolean isApproved;

    public RentCreateBindingModel() {
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    public boolean isApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }
}
