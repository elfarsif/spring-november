package com.spring.springappnovember.repositories;

import com.spring.springappnovember.entities.Variation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VariationRepository extends JpaRepository<Variation, Integer> {

    List<Variation> findByRecipeRecipeId(Long recipeId);
}