package com.spring.springappnovember.repositories;

import com.spring.springappnovember.entities.Recipe;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
	List<Recipe> findAllByUserId(Long userId);
    List<Recipe> findRecipesByUser_Username(String username);
}
