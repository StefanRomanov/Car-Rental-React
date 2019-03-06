package com.server.web.controllers;

import com.server.domain.entities.Receipt;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;


@RestController
public class HomeController {

    @GetMapping(value = "/", produces = "application/json")
    public Receipt HelloWorld(){
        Receipt receipt = new Receipt();
        receipt.setCarModel("aaaa");
        receipt.setDate(LocalDate.now());
        receipt.setCarBrand("bbbbb");

        return receipt;
    }


    @PostMapping(value = "/", produces = "application/json")
    public Receipt HelloWorldPost(){
        Receipt receipt = new Receipt();
        receipt.setCarModel("POST");
        receipt.setDate(LocalDate.now());
        receipt.setCarBrand("POST");

        return receipt;
    }

    @DeleteMapping(value = "/", produces = "application/json")
    public Receipt HelloWorldDelete(){
        Receipt receipt = new Receipt();
        receipt.setCarModel("DELETE");
        receipt.setDate(LocalDate.now());
        receipt.setCarBrand("DELETE");

        return receipt;
    }

    @PutMapping(value = "/", produces = "application/json")
    public Receipt HelloWorldPut(){
        Receipt receipt = new Receipt();
        receipt.setCarModel("PUT");
        receipt.setDate(LocalDate.now());
        receipt.setCarBrand("PUT");

        return receipt;
    }
}
