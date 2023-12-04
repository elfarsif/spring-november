package com.spring.springappnovember.controller;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.spring.springappnovember.dtos.CommitDto;
import com.spring.springappnovember.entities.Commit;
import com.spring.springappnovember.services.CommitService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/commits")
@CrossOrigin(origins = "*")
public class CommitController {

    private final CommitService commitService;

    public CommitController(CommitService commitService) {
        this.commitService = commitService;
    }

    @PostMapping
    public ResponseEntity<CommitDto> createCommit(@RequestBody CommitDto commitDTO) {
        return ResponseEntity.ok(commitService.createCommit(commitDTO));
    }

    @GetMapping
    public ResponseEntity<List<CommitDto>> getAllCommits() {
        return ResponseEntity.ok(commitService.getAllCommits());
    }
    
    @GetMapping("/{commitId}")
    public ResponseEntity<CommitDto> getCommitById(@PathVariable Long commitId) {
    	CommitDto commitDTO = commitService.getCommitById(commitId);
        if (commitDTO != null) {
            return ResponseEntity.ok(commitDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/byVariation/{variationId}")
    public ResponseEntity<List<CommitDto>> getCommitsByVariationId(@PathVariable Integer variationId) {
        List<CommitDto> commits = commitService.getCommitsByVariationId(variationId);
        return ResponseEntity.ok(commits);
    }
    
    @GetMapping("/latest/{variationId}")
    public CommitDto getLatestCommitByVariationId(@PathVariable Integer variationId) {
        return commitService.getLatestCommitByVariationId(variationId);
    }
    

}

