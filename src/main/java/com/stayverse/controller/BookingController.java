package com.stayverse.controller;

import com.stayverse.model.Booking;
import com.stayverse.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping
    public List<Booking> getBookings(@RequestParam(required = false) Long userId) {
        if (userId != null) {
            return bookingRepository.findByUserId(userId);
        }
        return bookingRepository.findAll();
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        if (booking.getId() == null) {
            booking.setId("STAY-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        }
        booking.setStatus("Confirmed");
        return bookingRepository.save(booking);
    }

    @PutMapping("/{id}/cancel")
    public Map<String, Object> cancelBooking(@PathVariable String id) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking != null) {
            booking.setStatus("Cancelled");
            bookingRepository.save(booking);
            return Map.of("success", true, "id", id);
        }
        return Map.of("success", false);
    }
}
