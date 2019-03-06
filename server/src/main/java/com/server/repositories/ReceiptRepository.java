package com.server.repositories;

import com.server.domain.entities.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceiptRepository extends JpaRepository<Receipt,String> {
    List<Receipt> findAllByBuyerId(String id);
}
