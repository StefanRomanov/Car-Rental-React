package com.server.domain.models.binding;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public class WithinDatesAndUserNameModel {
    private LocalDate startDate;
    private LocalDate endDate;
    private String username;

    public WithinDatesAndUserNameModel() {
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
