package com.spring.springappnovember.services;


import com.spring.springappnovember.dtos.RecipeDto;
import com.spring.springappnovember.entities.Recipe;

import java.util.List;

public interface RecipeService {
    RecipeDto createRecipe(RecipeDto recipeDto);
    List<RecipeDto> getAllRecipes();
    RecipeDto getRecipeById(Long id);
    RecipeDto updateRecipe(Long id, RecipeDto recipeDto);
    void deleteRecipe(Long id);
	List<RecipeDto> getRecipesByUserId(Long userId);
	List<RecipeDto> findRecipesByUsername(String username);
}
