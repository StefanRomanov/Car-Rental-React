package com.server.repositories;

import com.server.domain.entities.Rent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface RentRepository extends JpaRepository<Rent, String> {
    List<Rent> findAllByStartDateBetweenOrEndDateBetween(LocalDate firstStart, LocalDate firstEnd, LocalDate secondStart, LocalDate secondEnd);
    List<Rent> findAllByCarIdAndStartDateBeforeOrEndDateAfter(String id,LocalDate start, LocalDate end);
    List<Rent> findAllByApproved(boolean approved);
}
