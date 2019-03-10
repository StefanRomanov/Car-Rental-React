package com.server.domain.models;

import java.time.LocalDate;

public class RentFinishModel {
    private LocalDate date;

    public RentFinishModel() {
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
