package com.server.web.controllers;

import com.server.domain.models.view.SaleViewModel;
import com.server.services.SaleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;


@RestController
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    @GetMapping("/sales/all/{username}")
    public Page<SaleViewModel> getAllByUser(Pageable pageable,
                                            @PathVariable String username,
                                            @RequestParam(value = "query", required = false) String query) {

        return this.saleService.findAllByUsername(pageable, username, query);
    }
}
