package com.server.services;

import com.server.domain.models.ReceiptViewModel;
import com.server.repositories.ReceiptRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.lang.reflect.Type;
import java.util.List;

@Service
@Transactional
public class ReceiptServiceImpl implements ReceiptService {

    private final ModelMapper modelMapper;
    private final ReceiptRepository receiptRepository;

    public ReceiptServiceImpl(ModelMapper modelMapper, ReceiptRepository receiptRepository) {
        this.modelMapper = modelMapper;
        this.receiptRepository = receiptRepository;
    }


    public List<ReceiptViewModel> findAllByUserId(String userId) {

        Type type = new TypeToken<List<ReceiptViewModel>>(){}.getType();

        return this.modelMapper.map(this.receiptRepository.findAllByBuyerId(userId), type);
    }
}
