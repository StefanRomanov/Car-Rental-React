package com.server.services;

import com.server.domain.models.CarCreationBindingModel;
import com.server.domain.models.CarViewModel;
import com.server.domain.models.CarsWithinDatesModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface CarService {
    CarCreationBindingModel CreateCar(CarCreationBindingModel model);
    CarViewModel getFirstById(String id);
    boolean deleteById(String id);
    CarViewModel editCar(String id, CarCreationBindingModel model);
    Page<CarViewModel> allCars(Pageable pageable);
    Page<CarViewModel> allAvailableCars(Pageable pageable,CarsWithinDatesModel model);
}
