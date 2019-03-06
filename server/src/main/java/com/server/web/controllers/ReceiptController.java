package com.server.web.controllers;

import com.server.domain.entities.ResponseBody;
import com.server.domain.models.ReceiptViewModel;
import com.server.services.ReceiptService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReceiptController {

    private final ReceiptService receiptService;

    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
    }

    @GetMapping("/purchases/{id}")
    public List<ReceiptViewModel> getAllByUser(@PathVariable String id){
        return this.receiptService.findAllByUserId(id);
    }
}
