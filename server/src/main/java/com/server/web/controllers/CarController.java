package com.server.web.controllers;

import com.server.domain.entities.ResponseBody;
import com.server.domain.models.CarCreationBindingModel;
import com.server.domain.models.CarViewModel;
import com.server.domain.models.CarsWithinDatesModel;
import com.server.services.CarService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/cars")
public class CarController {

    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @PostMapping(value = "/create", produces = "application/json", consumes = "application/json")
    public ResponseBody createCar(@RequestBody CarCreationBindingModel model){
        ResponseBody responseBody = new ResponseBody();
        responseBody.setMessage("Car created !");
        responseBody.setEntity(this.carService.CreateCar(model));
        return responseBody;
    }

    @GetMapping("/{id}")
    public CarViewModel getById(@PathVariable("id") String id){
        return this.carService.getFirstById(id);
    }

    @PostMapping("/edit/{id}")
    public ResponseBody editCar(@PathVariable("id") String id, @RequestBody CarCreationBindingModel model, HttpServletResponse response) throws IOException {
        CarViewModel car = this.carService.editCar(id,model);

        if(car == null){
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Car with id " + id + "not found !");
        }

        ResponseBody rb = new ResponseBody();
        rb.setMessage("Car with id" + id +" successfully edited !");
        rb.setEntity(car);

        return rb;
    }

    @DeleteMapping("/delete/{id}")
    public ResponseBody deleteById(@PathVariable("id") String id, HttpServletResponse response) throws IOException {
        ResponseBody rb = new ResponseBody();

        if(this.carService.deleteById(id)){
            rb.setMessage("Car with " + id + "deleted !");
            rb.setEntity(id);
        } else {
            rb.setMessage("Car with id " + id + "not found !");
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Car with id " + id + "not found !");
        }

        return rb;
    }

    @GetMapping("/all")
    public ResponseBody allCars(Pageable pageable){
        ResponseBody rb = new ResponseBody();
        Page<CarViewModel> result = this.carService.allCars(pageable);

        rb.setEntity(result);
        return rb;
    }

    @PostMapping("/available")
    public ResponseBody availableCars(Pageable pageable, @RequestBody CarsWithinDatesModel model){

        ResponseBody rb = new ResponseBody();
        Page<CarViewModel> result = this.carService.allAvailableCars(pageable,model);

        rb.setEntity(result);
        return rb;
    }
}
