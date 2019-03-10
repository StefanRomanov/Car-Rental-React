package com.server.services;

import com.server.domain.entities.Car;
import com.server.domain.entities.Receipt;
import com.server.domain.entities.Rent;
import com.server.domain.models.CarsWithinDatesModel;
import com.server.domain.models.RentCreateBindingModel;
import com.server.domain.models.RentViewModel;
import com.server.repositories.CarRepository;
import com.server.repositories.ReceiptRepository;
import com.server.repositories.RentRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.lang.reflect.Type;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

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

        return this.modelMapper.map(rentRepository.saveAndFlush(this.modelMapper.map(rentModel, Rent.class)), RentViewModel.class);
    }

    @Override
    public List<RentViewModel> allUnapprovedRents() {
        Type type = new TypeToken<List<RentViewModel>>(){}.getType();
        return this.modelMapper.map(this.rentRepository.findAllByApproved(false),type);
    }

    @Override
    public List<RentViewModel> allApprovedRents() {
        Type type = new TypeToken<List<RentViewModel>>(){}.getType();

        return this.modelMapper.map(this.rentRepository.findAllByApproved(true),type);
    }

    @Override
    public List<RentViewModel> allActiveRents() {
        Type type = new TypeToken<List<RentViewModel>>(){}.getType();

        return this.modelMapper.map(this.rentRepository.findAllByFinishedAndApproved(false, true),type);
    }

    @Override
    public boolean approveRent(String id) {
        Rent rent = this.rentRepository.getOne(id);
        if(rent.getId() == null){
            return false;
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
            return false;
        }

        rent.getCar().getActiveRents().remove(rent);
        this.rentRepository.delete(rent);

        return true;
    }

    @Override
    public boolean finishRent(LocalDate returnDate, String id) {

        Rent rent = this.rentRepository.getOne(id);

        if(rent.getId() == null){
            return false;
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
