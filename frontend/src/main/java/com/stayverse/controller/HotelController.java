package com.stayverse.controller;

import com.stayverse.model.Hotel;
import com.stayverse.service.HotelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*")
public class HotelController {

    @Autowired
    private HotelService hotelService;

    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @PostMapping("/ensure")
    public List<Hotel> ensureHotels(@RequestBody Map<String, String> body) {
        String city = body.get("city");
        hotelService.ensureHotelsForCity(city);
        return hotelService.getHotelsByCity(city);
    }
}
