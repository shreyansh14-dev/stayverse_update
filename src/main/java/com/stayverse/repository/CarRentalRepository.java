package com.stayverse.repository;

import com.stayverse.model.CarRental;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CarRentalRepository extends JpaRepository<CarRental, Long> {
    List<CarRental> findByLocationIgnoreCase(String location);
}
