package com.spring.springappnovember.repositories;

import com.spring.springappnovember.entities.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
    // Custom database queries can be added here
}
