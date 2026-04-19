package com.stayverse.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "bookings")
public class Booking {
    @Id
    private String id; // STAY-XXXXXX
    
    private Long hotelId;
    private Long userId;
    private String checkIn;
    private String checkOut;
    private Integer guests;
    private Integer totalPrice;
    private String status;
}
