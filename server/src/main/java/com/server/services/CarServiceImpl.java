package com.server.services;

import com.server.domain.entities.Car;
import com.server.domain.models.CarCreationBindingModel;
import com.server.domain.models.CarViewModel;
import com.server.domain.models.CarsWithinDatesModel;
import com.server.repositories.CarRepository;
import com.server.repositories.RentRepository;
import com.server.util.PageMapper;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
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
        Car newCar = modelMapper.map(model, Car.class);

        return this.modelMapper.map(this.carRepository.saveAndFlush(newCar), CarCreationBindingModel.class);
    }

    @Override
    public CarViewModel getFirstById(String id) {
        return this.modelMapper.map(this.carRepository.findFirstById(id), CarViewModel.class);
    }

    @Override
    public boolean deleteById(String id) {
        Car car = this.carRepository.findFirstById(id);
        if (car == null) {
            return false;
        }

        car.getActiveRents().forEach(this.rentRepository::delete);

        this.carRepository.delete(car);

        return true;
    }

    @Override
    public CarViewModel editCar(String id, CarCreationBindingModel model) {
        Car car = this.carRepository.findFirstById(id);

        if (car == null) {
            return null;
        }

        car.setBrand(model.getBrand());
        car.setModel(model.getModel());
        car.setSeats(model.getSeats());
        car.setYear(model.getYear());
        car.setTrunkCapacity(model.getTrunkCapacity());
        car.setCount(model.getCount());
        car.setImageUrl(model.getImageUrl());
        car.setDescription(model.getDescription());
        car.setLitersPerHundredKilometers(model.getLitersPerHundredKilometers());
        car.setPricePerDay(model.getPricePerDay());

        return this.modelMapper.map(this.carRepository.saveAndFlush(car), CarViewModel.class);
    }

    @Override
    public Page<CarViewModel> allCars(Pageable pageable) {
        Page<Car> cars = this.carRepository.findAll(pageable);
        return PageMapper.mapPage(cars, CarViewModel.class, modelMapper);
    }

    @Override
    public Page<CarViewModel> allAvailableCars(Pageable pageable, CarsWithinDatesModel model) {

        List<Car> freeCars = this.carRepository.findAll()
                .stream()
                .filter(c -> c.isAvailable(model.getStartDate(), model.getEndDate()))
                .collect(Collectors.toList());

        long start = pageable.getOffset();

        long end = (start + pageable.getPageSize()) > freeCars.size() ? freeCars.size() : (start + pageable.getPageSize());
        Page<Car> cars = new PageImpl<>(freeCars.subList((int)start, (int)end), pageable, freeCars.size());

        return PageMapper.mapPage(cars, CarViewModel.class, this.modelMapper);
    }
}
