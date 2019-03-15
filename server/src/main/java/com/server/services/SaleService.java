package com.server.services;

import com.server.domain.entities.Rent;
import com.server.domain.entities.Sale;
import com.server.domain.models.view.SaleViewModel;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;

public interface SaleService {
    Page<SaleViewModel> findAllByUsername(Pageable pageable, String username, String rentId);
    Sale createSale(Rent rent);
    void createPenaltySale(Rent rent, LocalDate returnDate);
    void createApprovedSale(Rent rent);
    void createDeclinedSale(Rent rent);
}
