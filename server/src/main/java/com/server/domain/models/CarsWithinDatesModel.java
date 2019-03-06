package com.server.domain.models;

import java.time.LocalDate;

public class CarsWithinDatesModel {
    private LocalDate startDate;
    private LocalDate endDate;

    public CarsWithinDatesModel() {
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
}
