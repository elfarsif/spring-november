package com.spring.springappnovember.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "recipes")
@Data
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipeId;
    
    private String title;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Lombok @Data annotation generates getters, setters, equals, hashCode, and toString methods
}
