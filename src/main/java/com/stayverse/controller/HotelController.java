package com.stayverse.controller;

import com.stayverse.model.Hotel;
import com.stayverse.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
public class HotelController {

    @Autowired
    private HotelRepository hotelRepository;

    @jakarta.annotation.PostConstruct
    public void reducePrices() {
        hotelRepository.findAll().forEach(h -> {
            // FIXED: Cast to double to match Double target
            h.setPrice((double) Math.round(h.getPrice() * 0.25));
            hotelRepository.save(h);
        });
        System.out.println("Global Price reduction of 75% applied.");
    }

    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    @GetMapping("/search")
    public List<Hotel> searchHotels(@RequestParam String city) {
        return hotelRepository.findByCityIgnoreCase(city);
    }
    
    @GetMapping("/{id}")
    public Hotel getHotelById(@PathVariable Long id) {
        return hotelRepository.findById(id).orElse(null);
    }
}
