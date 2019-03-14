package com.server.domain.models.binding;

import com.server.domain.entities.Car;
import com.server.domain.entities.User;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class RentCreateBindingModel {
    private LocalDate startDate;
    private LocalDate endDate;
    private Car car;
    private User renter;
    private boolean isApproved;

    public RentCreateBindingModel() {
    }

    @NotNull
    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    @NotNull
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

    public User getRenter() {
        return renter;
    }

    public void setRenter(User renter) {
        this.renter = renter;
    }
}
