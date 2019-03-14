package com.server.web.controllers;

import com.server.domain.models.view.SaleViewModel;
import com.server.services.SaleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReceiptController {

    private final SaleService saleService;

    public ReceiptController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping("/sales/all/{username}")
    public List<SaleViewModel> getAllByUser(@PathVariable String username){
        List<SaleViewModel> sales = this.saleService.findAllByUsername(username);
        return sales;
    }
}
