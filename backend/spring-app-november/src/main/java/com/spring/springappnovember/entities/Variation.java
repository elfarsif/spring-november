package com.spring.springappnovember.entities;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "variations")
@Data
public class Variation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer variationId;

    @Column(nullable = false)
    private String variationTitle;

    @Lob
    @Column(nullable = false)
    private String instructions;

    @ManyToOne
    @JoinColumn(name = "recipe_id", nullable = false)
    private Recipe recipe;
}
