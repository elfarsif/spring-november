package com.spring.springappnovember.dtos;

import com.spring.springappnovember.entities.User;
import com.spring.springappnovember.entities.Variation;

import lombok.Data;

@Data
public class RecipeDto {
    private Long recipeId;
    private String title;
    // Assuming UserDto only contains user's id for the sake of simplicity
    private User user;
}
