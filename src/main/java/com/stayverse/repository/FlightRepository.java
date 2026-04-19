package com.stayverse.repository;

import com.stayverse.model.Flight;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {
    List<Flight> findByFromCityIgnoreCaseAndToCityIgnoreCase(String fromCity, String toCity);
}
