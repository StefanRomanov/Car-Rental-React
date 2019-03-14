package com.server.services;

import com.server.domain.entities.Car;
import com.server.domain.entities.Rent;
import com.server.domain.entities.User;
import com.server.domain.models.binding.WithinDatesAndUserNameModel;
import com.server.domain.models.binding.RentCreateBindingModel;
import com.server.domain.models.view.RentViewModel;
import com.server.exceptions.CarNotFoundException;
import com.server.exceptions.RentNotFoundException;
import com.server.exceptions.UserNotFoundException;
import com.server.repositories.CarRepository;
import com.server.repositories.RentRepository;
import com.server.util.PageMapper;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;

@Service
@Transactional
public class RentServiceImpl implements RentService {

    private final ModelMapper modelMapper;
    private final RentRepository rentRepository;
    private final CarRepository carRepository;
    private final SaleService saleService;
    private final UserService userService;

    public RentServiceImpl(ModelMapper modelMapper, RentRepository rentRepository, CarRepository carRepository, SaleService saleService, UserService userService) {
        this.modelMapper = modelMapper;
        this.rentRepository = rentRepository;
        this.carRepository = carRepository;
        this.saleService = saleService;
        this.userService = userService;
    }

    @Override
    public RentViewModel createRent(WithinDatesAndUserNameModel model, String carId) {
        RentCreateBindingModel rentModel = this.modelMapper.map(model,RentCreateBindingModel.class);

        Car car = this.carRepository.findFirstById(carId);

        if(car == null){
            throw new CarNotFoundException();
        }

        User user = (User) this.userService.loadUserByUsername(model.getUsername());
        if(user == null){
            throw new UserNotFoundException();
        }

        rentModel.setApproved(false);
        rentModel.setRenter(user);
        rentModel.setCar(car);

        Rent rent = this.modelMapper.map(rentModel, Rent.class);
        car.getActiveRents().add(rent);

        return this.modelMapper.map(rentRepository.saveAndFlush(rent), RentViewModel.class);
    }

    @Override
    public Page<RentViewModel> allUnapprovedRents(Pageable pageable) {
        return PageMapper.mapPage(this.rentRepository.findAllByApproved(pageable,false),RentViewModel.class,modelMapper);
    }

    @Override
    public Page<RentViewModel> allApprovedRents(Pageable pageable) {
        return PageMapper.mapPage(this.rentRepository.findAllByApproved(pageable,true),RentViewModel.class,modelMapper);
    }

    @Override
    public Page<RentViewModel> allActiveRents(Pageable pageable) {
        return PageMapper.mapPage(this.rentRepository.findAllByFinishedAndApproved(pageable,false,  true),RentViewModel.class,modelMapper);
    }

    @Override
    public boolean approveRent(String id) {
        Rent rent = this.rentRepository.getOne(id);
        if(rent.getId() == null){
            throw new RentNotFoundException();
        }

        rent.setApproved(true);

        this.saleService.createApprovedSale(rent);
        this.rentRepository.saveAndFlush(rent);
        return true;
    }

    @Override
    public boolean declineRent(String id) {

        Rent rent = this.rentRepository.getOne(id);

        if(rent.getId() == null){
            throw new RentNotFoundException();
        }

        this.saleService.createDeclinedSale(rent);

        rent.getCar().getActiveRents().remove(rent);

        this.rentRepository.delete(rent);

        return true;
    }

    @Override
    public boolean finishRent(LocalDate returnDate, String id) {

        Rent rent = this.rentRepository.getOne(id);

        if(rent.getId() == null){
            throw new RentNotFoundException();
        }

        rent.getCar().getActiveRents().remove(rent);

        rent.setFinished(true);

        rentRepository.saveAndFlush(rent);

        if(returnDate.isAfter(rent.getEndDate())){
            this.saleService.createPenaltySale(rent,returnDate);
        }
        return true;
    }
}
