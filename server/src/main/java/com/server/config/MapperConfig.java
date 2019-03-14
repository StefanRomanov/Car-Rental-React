package com.server.config;

import com.server.domain.entities.Rent;
import com.server.domain.models.view.CarViewModel;
import com.server.domain.models.view.RentViewModel;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {
    @Bean
    public ModelMapper modelMapper(){
        ModelMapper modelMapper = new ModelMapper();
        this.addMappings(modelMapper);

        return modelMapper;
    }

    private void addMappings(ModelMapper modelMapper) {
        rentViewModelMapping(modelMapper);
    }

    private void rentViewModelMapping(ModelMapper modelMapper) {
        Converter<Rent, RentViewModel> converter = new AbstractConverter<Rent, RentViewModel>() {
            @Override
            protected RentViewModel convert(Rent source) {
                RentViewModel destination = new RentViewModel();
                destination.setApproved(source.getApproved());
                destination.setCar(modelMapper.map(source.getCar(), CarViewModel.class));
                destination.setTotalPrice(source.calculatePrice());
                destination.setEndDate(source.getEndDate());
                destination.setStartDate(source.getStartDate());
                destination.setId(source.getId());

                return destination;
            }
        };

        modelMapper.addConverter(converter);
    }
}
