package com.spring.springappnovember.controller;

import com.spring.springappnovember.dtos.RecipeDto;
import com.spring.springappnovember.entities.Recipe;
import com.spring.springappnovember.services.RecipeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recipes")
@CrossOrigin(origins = "http://localhost:4200")
public class RecipeController {

    private final RecipeService recipeService;

    @Autowired
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @PostMapping
    public ResponseEntity<RecipeDto> createRecipe(@RequestBody RecipeDto recipeDto) {
        return ResponseEntity.ok(recipeService.createRecipe(recipeDto));
    }

    @GetMapping
    public ResponseEntity<List<RecipeDto>> getAllRecipes() {
        return ResponseEntity.ok(recipeService.getAllRecipes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecipeDto> getRecipeById(@PathVariable Long id) {
        return ResponseEntity.ok(recipeService.getRecipeById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecipeDto> updateRecipe(@PathVariable Long id, @RequestBody RecipeDto recipeDto) {
        return ResponseEntity.ok(recipeService.updateRecipe(id, recipeDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRecipe(@PathVariable Long id) {
        recipeService.deleteRecipe(id);
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<RecipeDto>> getRecipesByUserId(@PathVariable Long userId) {
        List<RecipeDto> recipes = recipeService.getRecipesByUserId(userId);
        return ResponseEntity.ok(recipes);
    }
    
    @GetMapping("/username")
    public ResponseEntity<List<RecipeDto>> getRecipesByUsername() {
    	String usernamejwt = SecurityContextHolder.getContext().getAuthentication().getName();
    	System.out.println("RECIPE CONTROLLER getRecipesByUsername jwt username"+usernamejwt);
        List<RecipeDto> recipes = recipeService.findRecipesByUsername(usernamejwt);
        if (recipes.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(recipes);
    }
    
    
}
