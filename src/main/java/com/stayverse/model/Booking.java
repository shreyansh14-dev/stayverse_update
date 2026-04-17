package com.stayverse.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
@Data
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private Long userId;
    private Long hotelId;
    private LocalDate checkIn;
    private LocalDate checkOut;
    private Integer guests;
    private Double totalPrice;
    private String status; // "Confirmed", "Pending", "Cancelled"
}
