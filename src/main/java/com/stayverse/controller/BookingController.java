package com.stayverse.controller;

import com.stayverse.model.Booking;
import com.stayverse.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUser(@PathVariable Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setStatus("Confirmed");
        return bookingRepository.save(booking);
    }
}
