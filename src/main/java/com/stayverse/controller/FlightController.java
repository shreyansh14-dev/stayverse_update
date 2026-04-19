package com.stayverse.controller;

import com.stayverse.model.Flight;
import com.stayverse.repository.FlightRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/flights")
@CrossOrigin(origins = "*")
public class FlightController {

    @Autowired
    private FlightRepository flightRepository;

    private static final List<String> AIRLINES = Arrays.asList("Air India", "IndiGo", "SpiceJet", "Vistara", "AirAsia India", "Akasa Air");
    private static final List<String> TIMES = Arrays.asList("06:30 AM", "10:15 AM", "01:45 PM", "04:30 PM", "08:15 PM", "11:00 PM");
    private static final List<String> CLASSES = Arrays.asList("Economy", "Premium Economy", "Business", "First Class");

    @GetMapping("/search")
    public List<Flight> searchFlights(@RequestParam String from, @RequestParam String to) {
        List<Flight> existing = flightRepository.findByFromCityIgnoreCaseAndToCityIgnoreCase(from, to);
        if (existing.isEmpty()) {
            ensureFlights(from, to);
            return flightRepository.findByFromCityIgnoreCaseAndToCityIgnoreCase(from, to);
        }
        return existing;
    }

    private synchronized void ensureFlights(String from, String to) {
        Random rand = new Random();
        for (int i = 0; i < 6; i++) {
            Flight f = new Flight();
            f.setFromCity(from);
            f.setToCity(to);
            f.setAirline(AIRLINES.get(rand.nextInt(AIRLINES.size())));
            f.setPrice(rand.nextInt(8000) + 2500); // 2500 to 10500
            f.setDepartureTime(TIMES.get(i % TIMES.size()));
            f.setClassType(CLASSES.get(rand.nextInt(CLASSES.size())));
            flightRepository.save(f);
        }
    }
}
