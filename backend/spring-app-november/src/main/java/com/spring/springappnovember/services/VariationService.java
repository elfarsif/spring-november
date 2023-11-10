package com.spring.springappnovember.services;


import com.spring.springappnovember.dtos.VariationDto;
import java.util.List;

public interface VariationService {
 VariationDto createVariation(VariationDto variationDto);
 List<VariationDto> getAllVariations();
 VariationDto getVariationById(Integer id);
 VariationDto updateVariation(Integer id, VariationDto variationDto);
 void deleteVariation(Integer id);
}

