package com.server.web.controllers;

import com.server.domain.entities.ResponseBody;
import com.server.exceptions.CarCreationBindingModel;
import com.server.domain.models.view.CarViewModel;
import com.server.domain.models.binding.WithinDatesAndUserNameModel;
import com.server.domain.models.view.RentViewModel;
import com.server.services.CarService;
import com.server.services.RentService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/cars")
public class CarController {

    private final CarService carService;
    private final RentService rentService;

    public CarController(CarService carService, RentService rentService) {
        this.carService = carService;
        this.rentService = rentService;
    }

    @PostMapping(value = "/create", produces = "application/json", consumes = "application/json")
    public ResponseBody createCar(@RequestBody @Valid CarCreationBindingModel model){
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
    public CarViewModel editCar(@PathVariable("id") String id, @RequestBody @Valid CarCreationBindingModel model, HttpServletResponse response) throws IOException {

        return this.carService.editCar(id,model);
    }

    @PostMapping("/reserve/{id}")
    public RentViewModel reserveCar(@RequestBody @Valid WithinDatesAndUserNameModel model, @PathVariable String id){

        return rentService.createRent(model,id);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseBody deleteById(@PathVariable("id") String id){
        ResponseBody rb = new ResponseBody();

        if(this.carService.deleteById(id)){
            rb.setMessage("Car with " + id + " deleted !");
        } else {
            rb.setMessage("Car with " + id + " not deleted !");
        }

        return rb;
    }

    @GetMapping("/all")
    public Page<CarViewModel> allCars(Pageable pageable, @RequestParam(value = "query",required = false) String query){

        return this.carService.allCars(pageable, query);
    }

    @PostMapping("/available")
    public Page<CarViewModel> availableCars(Pageable pageable,
                                            @RequestBody @Valid WithinDatesAndUserNameModel model,
                                            @RequestParam(value = "query",required = false) String query){
        return this.carService.allAvailableCars(pageable,model, query);
    }

    @PostMapping("/check/{id}")
    public boolean checkCarAvailability(@PathVariable String id, @RequestBody @Valid WithinDatesAndUserNameModel model){

        return this.carService.checkAvailability(id,model.getStartDate(), model.getEndDate());
    }

}
