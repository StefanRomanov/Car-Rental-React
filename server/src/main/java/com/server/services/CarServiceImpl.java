package com.server.services;

import com.server.domain.entities.Car;
import com.server.domain.entities.Rent;
import com.server.domain.models.CarCreationBindingModel;
import com.server.domain.models.CarViewModel;
import com.server.domain.models.CarsWithinDatesModel;
import com.server.repositories.CarRepository;
import com.server.repositories.RentRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.lang.reflect.Type;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CarServiceImpl implements CarService {
    private final CarRepository carRepository;
    private final ModelMapper modelMapper;
    private final RentRepository rentRepository;

    public CarServiceImpl(CarRepository carRepository, ModelMapper modelMapper, RentRepository rentRepository) {
        this.carRepository = carRepository;
        this.modelMapper = modelMapper;
        this.rentRepository = rentRepository;
    }

    @Override
    public CarCreationBindingModel CreateCar(CarCreationBindingModel model) {
        Car newCar = modelMapper.map(model,Car.class);

        return this.modelMapper.map(this.carRepository.saveAndFlush(newCar), CarCreationBindingModel.class);
    }

    @Override
    public CarViewModel getFirstById(String id) {
        return this.modelMapper.map(this.carRepository.findFirstById(id), CarViewModel.class);
    }

    @Override
    public boolean deleteById(String id) {
        Car car = this.carRepository.findFirstById(id);
        if(car == null){
            return false;
        }
        this.carRepository.delete(car);

        return true;
    }

    @Override
    public CarViewModel editCar(String id, CarCreationBindingModel model) {
        Car car = this.carRepository.findFirstById(id);

        if(car == null){
            return null;
        }

        car.setBrand(model.getBrand());
        car.setModel(model.getModel());
        car.setColor(model.getColor());
        car.setImageUrl(model.getImageUrl());
        car.setDescription(model.getDescription());
        car.setPower(model.getPower());
        car.setLitersPerHundredKilometers(model.getLitersPerHundredKilometers());
        car.setPricePerDay(model.getPricePerDay());

        return this.modelMapper.map(this.carRepository.saveAndFlush(car),CarViewModel.class);
    }

    @Override
    public List<CarViewModel> allCars() {
        Type type = new TypeToken<List<CarViewModel>>(){}.getType();
        return this.modelMapper.map(this.carRepository.findAll(),type);
    }

    @Override
    public List<CarViewModel> allAvailableCars(CarsWithinDatesModel model) {
        List<String> takenCars = this.rentRepository
                .findAllByStartDateBetweenOrEndDateBetween(
                        model.getStartDate(),
                        model.getEndDate(),
                        model.getStartDate(),
                        model.getEndDate())
                .stream()
                .map(r -> r.getCar().getId())
                .collect(Collectors.toList());

        List<Car> freeCars = this.carRepository.findAll()
                .stream()
                .filter(x -> !takenCars.contains(x.getId()))
                .collect(Collectors.toList());

        Type type = new TypeToken<List<CarViewModel>>(){}.getType();

        return this.modelMapper.map(freeCars, type);
    }
}