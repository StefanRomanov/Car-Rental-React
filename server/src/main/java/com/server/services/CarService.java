package com.server.services;

import com.server.exceptions.CarCreationBindingModel;
import com.server.domain.models.view.CarViewModel;
import com.server.domain.models.binding.WithinDatesAndUserNameModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface CarService {
    CarCreationBindingModel CreateCar(CarCreationBindingModel model);
    CarViewModel getFirstById(String id);
    boolean deleteById(String id);
    CarViewModel editCar(String id, CarCreationBindingModel model);
    Page<CarViewModel> allCars(Pageable pageable, String query);
    Page<CarViewModel> allAvailableCars(Pageable pageable, WithinDatesAndUserNameModel model, String query);
    boolean checkAvailability(String id, LocalDate startDate, LocalDate endDate);
}
