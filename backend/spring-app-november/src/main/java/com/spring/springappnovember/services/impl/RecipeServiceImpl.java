package com.spring.springappnovember.services.impl;

import com.spring.springappnovember.dtos.RecipeDto;
import com.spring.springappnovember.entities.Recipe;
import com.spring.springappnovember.repositories.RecipeRepository;
import com.spring.springappnovember.services.RecipeService;
import com.spring.springappnovember.services.VariationService;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    

    @Autowired
    public RecipeServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }
    
    @Override
    public List<RecipeDto> getRecipesByUserId(Long userId) {
        List<Recipe> recipes = recipeRepository.findAllByUserId(userId);
        return recipes.stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }
	@Override
    public List<RecipeDto> findRecipesByUsername(String username) {
		List<Recipe> recipes = recipeRepository.findRecipesByUser_Username(username);
        return recipes.stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }
    
    @Override
    public RecipeDto createRecipe(RecipeDto recipeDto) {
        Recipe recipe = new Recipe();
        BeanUtils.copyProperties(recipeDto, recipe);
        recipe = recipeRepository.save(recipe);
        BeanUtils.copyProperties(recipe, recipeDto);
        return recipeDto;
    }

    @Override
    public List<RecipeDto> getAllRecipes() {
        return recipeRepository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public RecipeDto getRecipeById(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
        return convertEntityToDto(recipe);
    }

    @Override
    public RecipeDto updateRecipe(Long id, RecipeDto recipeDto) {
        Recipe existingRecipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
        BeanUtils.copyProperties(recipeDto, existingRecipe, "id");
        existingRecipe = recipeRepository.save(existingRecipe);
        BeanUtils.copyProperties(existingRecipe, recipeDto);
        return recipeDto;
    }

    @Override
    public void deleteRecipe(Long id) {
        Recipe recipe = recipeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recipe not found with id: " + id));
        recipeRepository.delete(recipe);
    }

    private RecipeDto convertEntityToDto(Recipe recipe) {
        RecipeDto recipeDto = new RecipeDto();
        BeanUtils.copyProperties(recipe, recipeDto);
        return recipeDto;
    }
}
