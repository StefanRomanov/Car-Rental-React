package com.server.repositories;

import com.server.domain.entities.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.persistence.NamedNativeQuery;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Repository
public interface CarRepository extends JpaRepository<Car, String> {
    Car findFirstById(String id);

    @Query(value = "select * from cars as c " +
            "left join rents as r " +
            "on c.id = r.car_id " +
            "where r.start_date not between :startDate and :endDate " +
            "or r.end_date not between :startDate and :endDate",
            nativeQuery = true)
    List<Car> findAllCarsWithRentsNotInRange(LocalDate startDate, LocalDate endDate);
}
