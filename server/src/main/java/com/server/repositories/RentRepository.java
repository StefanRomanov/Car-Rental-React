package com.server.repositories;

import com.server.domain.entities.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RentRepository extends JpaRepository<Rent, String> {
    List<Rent> findAllByApproved(boolean approved);
    List<Rent> findAllByFinishedAndApproved(boolean finished, boolean approved);
}
