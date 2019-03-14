package com.server.web.controllers;

import com.server.domain.entities.ResponseBody;
import com.server.domain.models.binding.RentFinishModel;
import com.server.domain.models.view.RentViewModel;
import com.server.services.RentService;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/rents")
public class RentController {

    private final RentService rentService;

    public RentController(RentService rentService) {
        this.rentService = rentService;
    }




    @GetMapping("/approved")
    public Page<RentViewModel> allApproved(Pageable pageable){
        return this.rentService.allApprovedRents(pageable);
    }

    @GetMapping("/active")
    public Page<RentViewModel> allActive(Pageable pageable) {return this.rentService.allActiveRents(pageable);}

    @GetMapping("/unapproved")
    public Page<RentViewModel> allUnapproved(Pageable pageable){
        return this.rentService.allUnapprovedRents(pageable);
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
    public ResponseBody finishRent(@PathVariable String id, @RequestBody @Valid RentFinishModel model){

        ResponseBody rb = new ResponseBody();
        boolean result = this.rentService.finishRent(model.getDate(),id);

        if(result){
            rb.setMessage("Rent" + id + "finished !");
        } else {
            rb.setMessage("Rent finish failed !");
        }

        return rb;
    }
}
