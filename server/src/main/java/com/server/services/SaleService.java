package com.server.services;

import com.server.domain.entities.Rent;
import com.server.domain.entities.Sale;
import com.server.domain.models.view.SaleViewModel;

import java.time.LocalDate;
import java.util.List;

public interface SaleService {
    List<SaleViewModel> findAllByUsername(String username);
    Sale createSale(Rent rent);
    void createPenaltySale(Rent rent, LocalDate returnDate);
    void createApprovedSale(Rent rent);
    void createDeclinedSale(Rent rent);
}
