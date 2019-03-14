package com.server.domain.models.binding;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class RentFinishModel {
    private LocalDate date;

    public RentFinishModel() {
    }

    @NotNull
    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
