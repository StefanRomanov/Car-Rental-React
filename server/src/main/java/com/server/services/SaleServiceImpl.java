package com.server.services;

import com.server.domain.entities.Rent;
import com.server.domain.entities.Sale;
import com.server.domain.enums.SaleType;
import com.server.domain.models.view.SaleViewModel;
import com.server.repositories.SaleRepository;
import com.server.util.PageMapper;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class SaleServiceImpl implements SaleService {

    private final ModelMapper modelMapper;
    private final SaleRepository saleRepository;

    public SaleServiceImpl(ModelMapper modelMapper, SaleRepository saleRepository) {
        this.modelMapper = modelMapper;
        this.saleRepository = saleRepository;
    }


    @Override
    public Page<SaleViewModel> findAllByUsername(Pageable pageable, String username, String query) {

        Page<Sale> sales = this.saleRepository.findAllByBuyerUsername(pageable, username);

        List<Sale> filtered = sales.getContent()
                .stream()
                .filter(s -> s.getRentId().contains(query)
                                            || s.getCarModel().toLowerCase().contains(query.toLowerCase())
                                            || s.getCarBrand().toLowerCase().contains(query.toLowerCase())
                                            || s.getType().toString().contains(query.toUpperCase()))
                .collect(Collectors.toList());

        Page<Sale> filteredSales = new PageImpl<>(filtered, PageRequest.of(sales.getNumber(), sales.getSize(), sales.getSort()), sales.getTotalElements());

        return PageMapper.mapPage(filteredSales, SaleViewModel.class, modelMapper);
    }

    @Override
    public Sale createSale(Rent rent) {
        Sale sale = new Sale();

        sale.setBuyer(rent.getRenter());
        sale.setRentId(rent.getId());
        sale.setStartDate(rent.getStartDate());
        sale.setEndDate(rent.getEndDate());
        sale.setIssueDate(LocalDate.now());
        sale.setCarBrand(rent.getCar().getBrand());
        sale.setCarModel(rent.getCar().getModel());
        sale.setPricePaid(rent.calculatePrice());

        return sale;
    }

    @Override
    public void createPenaltySale(Rent rent, LocalDate returnDate) {
        long days = ChronoUnit.DAYS.between(rent.getEndDate(), returnDate) + 1;
        Sale sale = createSale(rent);
        sale.setPricePaid(rent.getCar().getPricePerDay() * days);
        sale.setType(SaleType.PENALTY);
        sale.setStartDate(rent.getEndDate().plusDays(1));
        sale.setEndDate(returnDate);

        this.saleRepository.saveAndFlush(sale);
    }

    @Override
    public void createApprovedSale(Rent rent) {
        Sale sale = this.createSale(rent);
        sale.setType(SaleType.APPROVED);

        this.saleRepository.saveAndFlush(sale);
    }

    @Override
    public void createDeclinedSale(Rent rent) {
        Sale sale = this.createSale(rent);
        sale.setType(SaleType.DECLINED);

        this.saleRepository.saveAndFlush(sale);
    }
}
