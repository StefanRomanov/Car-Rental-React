package com.server.web.controllers;

import com.server.domain.entities.ResponseBody;
import com.server.domain.models.CarsWithinDatesModel;
import com.server.domain.models.RentFinishModel;
import com.server.domain.models.RentViewModel;
import com.server.services.RentService;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/rents")
public class RentController {

    private final RentService rentService;

    public RentController(RentService rentService) {
        this.rentService = rentService;
    }


    @PostMapping("/reserve/{id}")
    public ResponseBody reserveCar(@RequestBody CarsWithinDatesModel model, @PathVariable String id){
        RentViewModel result = rentService.createRent(model,id);

        ResponseBody rb = new ResponseBody();
        rb.setMessage("Rent created !");
        rb.setEntity(result);

        return rb;
    }

    @GetMapping("/approved")
    public List<RentViewModel> allApproved(){
        return this.rentService.allApprovedRents();
    }

    @GetMapping("/active")
    public List<RentViewModel> allActive() {return this.rentService.allActiveRents();}

    @GetMapping("/unapproved")
    public List<RentViewModel> allUnapproved(){
        return this.rentService.allUnapprovedRents();
    }

    @PostMapping("/approve/{id}")
    public ResponseBody approveRent(@PathVariable String id){
        ResponseBody rb = new ResponseBody();
        boolean result = this.rentService.approveRent(id);

        if(result){
            rb.setMessage("Rent" + id + "approved successfully !");
        } else {
            rb.setMessage("Approval failed !");
        }

        return rb;
    }

    @PostMapping("/decline/{id}")
    public ResponseBody declineRent(@PathVariable String id){
        ResponseBody rb = new ResponseBody();
        boolean result = this.rentService.declineRent(id);

        if(result){
            rb.setMessage("Rent" + id + "declined !");
        } else {
            rb.setMessage("Decline failed !");
        }

        return rb;
    }

    @PostMapping("/finish/{id}")
    public ResponseBody finishRent(@PathVariable String id, @RequestBody RentFinishModel model){

        ResponseBody rb = new ResponseBody();
        boolean result = this.rentService.finishRent(model.getDate(),id);

        if(result){
            rb.setMessage("Rent" + id + "finished !");
        } else {
            rb.setMessage("Didn't finish failed !");
        }

        return rb;
    }
}
