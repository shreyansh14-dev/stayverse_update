package com.stayverse.controller;

import com.stayverse.model.CarRental;
import com.stayverse.repository.CarRentalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/cars")
@CrossOrigin(origins = "*")
public class CarRentalController {

    @Autowired
    private CarRentalRepository carRentalRepository;

    private static final List<String> CAR_NAMES = Arrays.asList("Luxury Sedan - Black", "Premium SUV - Silver", "Executive Coupe - White", "Comfort Hatchback - Blue", "Family Van - Grey");
    private static final List<String> PROVIDERS = Arrays.asList("Elite Drive", "VerseCars", "CityRide", "GlobalRent", "StayRide");

    @GetMapping("/search")
    public List<CarRental> searchCars(@RequestParam String location) {
        List<CarRental> existing = carRentalRepository.findByLocationIgnoreCase(location);
        if (existing.isEmpty()) {
            ensureCars(location);
            return carRentalRepository.findByLocationIgnoreCase(location);
        }
        return existing;
    }

    private synchronized void ensureCars(String location) {
        Random rand = new Random();
        for (int i = 0; i < 5; i++) {
            CarRental c = new CarRental();
            c.setLocation(location);
            c.setName(CAR_NAMES.get(i % CAR_NAMES.size()));
            c.setType(i % 2 == 0 ? "SUV" : "Sedan");
            c.setPrice(rand.nextInt(100) + 50); // 50 to 150
            c.setProvider(PROVIDERS.get(rand.nextInt(PROVIDERS.size())));
            c.setSeats(i % 2 == 0 ? 7 : 4);
            c.setImage(""); // UI generates the icon
            carRentalRepository.save(c);
        }
    }
}
