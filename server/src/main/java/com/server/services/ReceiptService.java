package com.server.services;

import com.server.domain.models.ReceiptViewModel;

import java.util.List;

public interface ReceiptService {
    List<ReceiptViewModel> findAllByUserId(String id);
}
