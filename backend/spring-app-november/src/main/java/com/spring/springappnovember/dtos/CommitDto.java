package com.spring.springappnovember.dtos;

import java.time.LocalDateTime;


import lombok.Data;

@Data
public class CommitDto {
    private Long commitId;
    private Integer variationId;
    private String message;
    private String instructions;
    private String results;
    private LocalDateTime timestamp;

    // Constructors, Getters, and Setters
}
