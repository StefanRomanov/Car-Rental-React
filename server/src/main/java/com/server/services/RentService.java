package com.server.services;

import com.server.domain.models.CarsWithinDatesModel;
import com.server.domain.models.RentViewModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface RentService {
    RentViewModel createRent(CarsWithinDatesModel mode, String carId);
    Page<RentViewModel> allUnapprovedRents(Pageable pageable);
    Page<RentViewModel> allApprovedRents(Pageable pageable);
    boolean approveRent(String id);
    boolean declineRent(String id);
    boolean finishRent(LocalDate returnDate, String id);
    Page<RentViewModel> allActiveRents(Pageable pageable);
}
