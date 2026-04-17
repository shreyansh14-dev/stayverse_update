package com.stayverse.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "hotels")
@Data
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String city;
    private String type;
    private String location;
    private Double price;
    private Double rating;
    private Integer reviews;
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String images; // Store as JSON string as per SQLite current structure
    
    private String image; // Primary image
}
