package com.spring.springappnovember.dtos;

import com.spring.springappnovember.entities.Recipe;

import lombok.Data;

@Data
public class VariationDto {
    private Integer variationId;

    private String variationTitle;

    private String instructions;

    private Recipe recipe;

}
