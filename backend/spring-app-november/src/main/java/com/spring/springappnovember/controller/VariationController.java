package com.spring.springappnovember.controller;

import com.spring.springappnovember.dtos.RecipeDto;
import com.spring.springappnovember.dtos.VariationDto;
import com.spring.springappnovember.services.VariationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/variations")
@CrossOrigin(origins = "http://localhost:4200")
public class VariationController {

    private final VariationService variationService;

    @Autowired
    public VariationController(VariationService variationService) {
        this.variationService = variationService;
    }

    @PostMapping
    public ResponseEntity<VariationDto> createVariation(@RequestBody VariationDto variationDto) {
        return ResponseEntity.ok(variationService.createVariation(variationDto));
    }

    @GetMapping
    public ResponseEntity<List<VariationDto>> getAllVariations() {
        return ResponseEntity.ok(variationService.getAllVariations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<VariationDto> getVariationById(@PathVariable Integer id) {
        return ResponseEntity.ok(variationService.getVariationById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<VariationDto> updateVariation(@PathVariable Integer id, @RequestBody VariationDto variationDto) {
        return ResponseEntity.ok(variationService.updateVariation(id, variationDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVariation(@PathVariable Integer id) {
        variationService.deleteVariation(id);
        return ResponseEntity.ok().build();
    }
}
