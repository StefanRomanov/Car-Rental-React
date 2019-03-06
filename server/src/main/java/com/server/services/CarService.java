package com.server.services;

import com.server.domain.models.CarCreationBindingModel;
import com.server.domain.models.CarViewModel;
import com.server.domain.models.CarsWithinDatesModel;

import java.util.List;

public interface CarService {
    CarCreationBindingModel CreateCar(CarCreationBindingModel model);
    CarViewModel getFirstById(String id);
    boolean deleteById(String id);
    CarViewModel editCar(String id, CarCreationBindingModel model);
    List<CarViewModel> allCars();
    List<CarViewModel> allAvailableCars(CarsWithinDatesModel model);
}
