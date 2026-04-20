package com.stayverse.service;

import com.stayverse.model.Hotel;
import com.stayverse.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class HotelService {

    @Autowired
    private HotelRepository hotelRepository;

    private static final List<String> INDIAN_CITIES = Arrays.asList(
        "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", "Surat", "Pune", "Jaipur",
        "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara",
        "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivli", "Vasai-Virar", "Varanasi",
        "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai", "Allahabad", "Howrah", "Ranchi", "Gwalior", "Jabalpur",
        "Coimbatore", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubli-Dharwad",
        "Bareilly", "Moradabad", "Mysore", "Gurgaon", "Aligarh", "Jalandhar", "Tiruchirappalli", "Bhubaneswar", "Salem", "Mira-Bhayandar",
        "Warangal", "Thiruvananthapuram", "Guntur", "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner", "Amravati", "Noida", "Jamshedpur",
        "Bhilai", "Cuttack", "Firozabad", "Kochi", "Bhavnagar", "Dehradun", "Durgapur", "Asansol", "Nanded", "Kolhapur",
        "Ajmer", "Gulbarga", "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Nellore", "Jammu",
        "Sangli-Miraj & Kupwad", "Belgaum", "Mangalore", "Ambattur", "Tirunelveli", "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala"
    );

    private static final List<String> HOTEL_TYPES = Arrays.asList("Hotels", "Resorts", "Apartments", "Villas", "Boutique", "Palace");
    private static final List<String> DESC_PREFIX = Arrays.asList(
        "Experience world-class luxury in the heart of", 
        "A perfect relaxing getaway situated beautifully in", 
        "Charming and incredibly cozy stays right inside", 
        "Unrivaled 5-star experience with stunning sunset views at", 
        "Dive into premium hospitality designed exclusively for you in"
    );
    private static final List<List<String>> FEATURES = Arrays.asList(
        Arrays.asList("Free WiFi", "Swimming Pool", "Spa & Wellness"),
        Arrays.asList("Free Breakfast", "Restaurant", "Airport Transfer"),
        Arrays.asList("Fitness Center", "City View", "Executive Lounge"),
        Arrays.asList("Private Pool", "Ocean View", "All Inclusive"),
        Arrays.asList("Boutique", "Free WiFi", "Pet Friendly")
    );

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public List<Hotel> getHotelsByCity(String city) {
        return hotelRepository.findByCityIgnoreCase(city);
    }

    public synchronized void ensureHotelsForCity(String city) {
        List<Hotel> existing = hotelRepository.findByCityIgnoreCase(city);
        if (!existing.isEmpty()) return;

        Random rand = new Random();
        for (int i = 1; i <= 8; i++) {
            Hotel h = new Hotel();
            String type = HOTEL_TYPES.get(rand.nextInt(HOTEL_TYPES.size()));
            String nameOption = i == 1 ? "Grand" : i == 2 ? "Royal" : i == 3 ? "Boutique" : i == 4 ? "Palace of" : i == 5 ? "Imperial" : i == 6 ? "Central" : i == 7 ? "Premium" : "Elite";
            
            h.setName(nameOption + " " + city + " " + type);
            h.setLocation("Downtown " + city);
            h.setCity(city);
            h.setType(type);
            h.setPrice(rand.nextInt(800) + 120);
            h.setRating(Double.parseDouble(String.format("%.1f", rand.nextDouble() * 1.5 + 3.5)));
            h.setReviews(rand.nextInt(3000) + 50);
            
            String[] imgSet = {
                "https://images.unsplash.com/photo-1542314831-c6a4d27488c0?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80",
                "https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=600&q=80"
            };
            h.setImage(imgSet[0]);
            h.setFeatures("[\"" + String.join("\",\"", FEATURES.get(rand.nextInt(FEATURES.size()))) + "\"]");
            h.setDescription(DESC_PREFIX.get(rand.nextInt(DESC_PREFIX.size())) + " " + city + ". Enjoy premium amenities tailored strictly for luxury.");
            h.setImages("[\"" + String.join("\",\"", imgSet) + "\"]");
            
            hotelRepository.save(h);
        }
    }
}
