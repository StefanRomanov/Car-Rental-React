package com.server.services;

import com.server.domain.entities.Car;
import com.server.domain.entities.Receipt;
import com.server.domain.entities.Rent;
import com.server.domain.models.CarsWithinDatesModel;
import com.server.domain.models.RentCreateBindingModel;
import com.server.domain.models.RentViewModel;
import com.server.exceptions.RentNotFoundException;
import com.server.repositories.CarRepository;
import com.server.repositories.ReceiptRepository;
import com.server.repositories.RentRepository;
import com.server.util.PageMapper;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

@Service
@Transactional
public class RentServiceImpl implements RentService {

    private final ModelMapper modelMapper;
    private final RentRepository rentRepository;
    private final CarRepository carRepository;
    private final ReceiptRepository receiptRepository;

    public RentServiceImpl(ModelMapper modelMapper, RentRepository rentRepository, CarRepository carRepository, ReceiptRepository receiptRepository) {
        this.modelMapper = modelMapper;
        this.rentRepository = rentRepository;
        this.carRepository = carRepository;
        this.receiptRepository = receiptRepository;
    }

    @Override
    public RentViewModel createRent(CarsWithinDatesModel model, String carId) {
        RentCreateBindingModel rentModel = this.modelMapper.map(model,RentCreateBindingModel.class);
        Car car = this.carRepository.findFirstById(carId);
        rentModel.setApproved(false);
        //TODO: ADD USER
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

        this.receiptRepository.save(createReceipt(rent));
        this.rentRepository.saveAndFlush(rent);
        return true;
    }

    @Override
    public boolean declineRent(String id) {

        Rent rent = this.rentRepository.getOne(id);

        if(rent.getId() == null){
            throw new RentNotFoundException();
        }

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

        if(returnDate.isAfter(rent.getEndDate())){
            this.createPenaltyReceipt(rent,returnDate);
        }
        return true;
    }



    private Receipt createReceipt(Rent rent){
        Receipt receipt = new Receipt();

        receipt.setBuyer(rent.getRenter());
        receipt.setDate(LocalDate.now());
        receipt.setCarBrand(rent.getCar().getBrand());
        receipt.setCarModel(rent.getCar().getModel());
        receipt.setPricePaid(rent.calculatePrice());

        return receipt;
    }

    private void createPenaltyReceipt(Rent rent, LocalDate returnDate){
        long days = ChronoUnit.DAYS.between(rent.getEndDate(),returnDate) + 1;
        Receipt receipt = createReceipt(rent);
        receipt.setPricePaid(rent.getCar().getPricePerDay() * days);
        this.receiptRepository.saveAndFlush(receipt);
    }
}
