package com.server.domain.entities;


import javax.persistence.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;


@Entity
@Table(name = "rents")
public class Rent extends BaseEntity {
    private Car car;
    private User renter;
    private LocalDate startDate;
    private LocalDate endDate;
    private boolean isApproved;

    public Rent() {
    }

    @OneToOne
    public Car getCar() {
        return car;
    }

    public void setCar(Car car) {
        this.car = car;
    }

    @ManyToOne
    public User getRenter() {
        return renter;
    }

    public void setRenter(User renter) {
        this.renter = renter;
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

    public Double calculatePrice(){

        long days = ChronoUnit.DAYS.between(this.getStartDate(),this.getEndDate());

        return days * this.getCar().getPricePerDay();
    }

    public boolean getApproved() {
        return isApproved;
    }

    public void setApproved(boolean approved) {
        isApproved = approved;
    }
}