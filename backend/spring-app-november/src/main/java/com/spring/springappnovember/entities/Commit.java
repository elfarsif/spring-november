package com.spring.springappnovember.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "commits")
@Data
public class Commit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commitId;

    @Column(name = "variation_id")
    private Integer variationId;
    
    @Column(name = "commit_message")
    private String message;
    
    @Column(name = "instructions")
    private String instructions;
    
    @Column(name = "results")
    private String results;

    @Column(name = "commit_timestamp")
    private LocalDateTime timestamp; 
}
