package com.stayverse.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "flights")
public class Flight {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String fromCity;
    private String toCity;
    private String airline;
    private Integer price;
    private String departureTime;
    private String classType;
}
