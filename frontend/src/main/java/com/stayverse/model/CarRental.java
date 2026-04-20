package com.stayverse.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "car_rentals")
public class CarRental {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String location;
    private String name;
    private String type; // Sedan, SUV, etc.
    private Integer price;
    private String provider;
    private Integer seats;
    private String image;
}
