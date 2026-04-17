package com.stayverse.controller;

import com.stayverse.repository.HotelRepository;
import com.stayverse.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class MainController {

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/")
    public String index() {
        return "index";
    }

    @GetMapping("/explore")
    public String explore(Model model) {
        return "explore";
    }

    @GetMapping("/search")
    public String search(@RequestParam String city, Model model) {
        model.addAttribute("hotels", hotelRepository.findByCityIgnoreCase(city));
        model.addAttribute("city", city);
        return "search-results";
    }

    @GetMapping("/property")
    public String property(@RequestParam Long id, Model model) {
        model.addAttribute("hotel", hotelRepository.findById(id).orElse(null));
        return "property-details";
    }

    @GetMapping("/dashboard")
    public String dashboard(Model model) {
        model.addAttribute("bookings", bookingRepository.findAll());
        return "dashboard";
    }
}
