package com.spring.springappnovember.services.impl;


import com.spring.springappnovember.dtos.RecipeDto;
import com.spring.springappnovember.dtos.VariationDto;
import com.spring.springappnovember.entities.Commit;
import com.spring.springappnovember.entities.Recipe;
import com.spring.springappnovember.entities.Variation;
import com.spring.springappnovember.repositories.CommitRepository;
import com.spring.springappnovember.repositories.VariationRepository;
import com.spring.springappnovember.services.VariationService;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VariationServiceImpl implements VariationService {

    private final VariationRepository variationRepository;
    private final CommitRepository commitRepository;

    @Autowired
    public VariationServiceImpl(VariationRepository variationRepository, CommitRepository commitRepository) {
        this.variationRepository = variationRepository;
		this.commitRepository = commitRepository;
    }

    @Override
    public VariationDto createVariation(VariationDto variationDto) {
    	
    	
        Variation variation = new Variation();
        BeanUtils.copyProperties(variationDto, variation);
        variation = variationRepository.save(variation);
        BeanUtils.copyProperties(variation, variationDto);
        
        Commit commit=new Commit();
        commit.setInstructions("Add new Recipe Here");
        commit.setMessage("");
        commit.setResults("");
        commit.setVariationId(variation.getVariationId());
        commit.setTimestamp(null);
        Commit commitReturned=new Commit();
        commitReturned=commitRepository.save(commit);
        System.out.println("NEW COMMIT RETURNed"+commitReturned);
        
        return variationDto;
    }

    @Override
    public List<VariationDto> getAllVariations() {
        return variationRepository.findAll()
                .stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public VariationDto getVariationById(Integer id) {
        Variation variation = variationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variation not found with id: " + id));
        return convertEntityToDto(variation);
    }

    @Override
    public VariationDto updateVariation(Integer id, VariationDto variationDto) {
        Variation existingVariation = variationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variation not found with id: " + id));
        BeanUtils.copyProperties(variationDto, existingVariation, "variationId");
        existingVariation = variationRepository.save(existingVariation);
        BeanUtils.copyProperties(existingVariation, variationDto);
        return variationDto;
    }
    @Override
    public List<VariationDto> getVariationsByRecipeId(Long recipeId) {
        List<Variation> variations = variationRepository.findByRecipeRecipeId(recipeId);
        return variations.stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteVariation(Integer id) {
        Variation variation = variationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Variation not found with id: " + id));
        variationRepository.delete(variation);
    }
    
    @Override
    public List<VariationDto> getMainVariationsByRecipeId(Long recipeId) {
    	List<Variation> variations = variationRepository.findByRecipeRecipeIdAndIsMainTrue(recipeId);
    	return variations.stream()
                .map(this::convertEntityToDto)
                .collect(Collectors.toList());
    }

    private VariationDto convertEntityToDto(Variation variation) {
        VariationDto variationDto = new VariationDto();
        BeanUtils.copyProperties(variation, variationDto);
        return variationDto;
    }

}

