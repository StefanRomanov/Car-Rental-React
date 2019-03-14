package com.server.repositories;

import com.server.domain.entities.Car;
import com.server.domain.entities.Rent;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface RentRepository extends JpaRepository<Rent, String> {
    Page<Rent> findAllByApproved(Pageable pageable, boolean approved);
    Page<Rent> findAllByFinishedAndApproved(Pageable pageable,boolean finished, boolean approved);
    List<Rent> findAllByCar(Car car);
}
