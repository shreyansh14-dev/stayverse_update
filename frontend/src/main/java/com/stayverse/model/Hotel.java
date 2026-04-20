package com.stayverse.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "hotels")
public class Hotel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String location;
    private String city;
    private String type;
    private Integer price;
    private Double rating;
    private Integer reviews;
    private String image;
    
    @Column(columnDefinition = "TEXT")
    private String features; // JSON string
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(columnDefinition = "TEXT")
    private String images; // JSON string
}
