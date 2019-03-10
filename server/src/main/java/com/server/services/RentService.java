package com.server.services;

import com.server.domain.models.CarsWithinDatesModel;
import com.server.domain.models.RentViewModel;

import java.time.LocalDate;
import java.util.List;

public interface RentService {
    RentViewModel createRent(CarsWithinDatesModel mode, String carId);
    List<RentViewModel> allUnapprovedRents();
    List<RentViewModel> allApprovedRents();
    boolean approveRent(String id);
    boolean declineRent(String id);
    boolean finishRent(LocalDate returnDate, String id);
    List<RentViewModel> allActiveRents();
}
