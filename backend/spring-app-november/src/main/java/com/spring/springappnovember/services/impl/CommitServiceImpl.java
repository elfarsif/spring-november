package com.spring.springappnovember.services.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.spring.springappnovember.dtos.CommitDto;
import com.spring.springappnovember.dtos.VariationDto;
import com.spring.springappnovember.entities.Commit;
import com.spring.springappnovember.entities.Variation;
import com.spring.springappnovember.repositories.CommitRepository;
import com.spring.springappnovember.services.CommitService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommitServiceImpl implements CommitService {

    private final CommitRepository commitRepository;

    public CommitServiceImpl(CommitRepository commitRepository) {
        this.commitRepository = commitRepository;
    }

    @Override
    public CommitDto createCommit(CommitDto commitDto) {
        Commit commit = new Commit();
        BeanUtils.copyProperties(commitDto, commit);
        commit = commitRepository.save(commit);
        BeanUtils.copyProperties(commit, commitDto);
        return commitDto;
    }

    @Override
    public List<CommitDto> getAllCommits() {
        return commitRepository.findAll().stream()
                .map(commit -> {
                	CommitDto dto = new CommitDto();
                	System.out.println(commit);
                    BeanUtils.copyProperties(commit, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }
    
    @Override
    public CommitDto getCommitById(Long commitId) {
        Optional<Commit> commit = commitRepository.findById(commitId);
        if (commit.isPresent()) {
        	CommitDto commitDTO = new CommitDto();
            BeanUtils.copyProperties(commit.get(), commitDTO);
            return commitDTO;
        }
        return null; // Or handle it differently based on your application logic
    }

    @Override
    public List<CommitDto> getCommitsByVariationId(Integer variationId) {
        return commitRepository.findByVariationId(variationId).stream()
                .map(entity -> {
                	CommitDto dto = new CommitDto();
                    BeanUtils.copyProperties(entity, dto);
                    return dto;
                })
                .collect(Collectors.toList());
    }
    
    @Override
    public CommitDto getLatestCommitByVariationId(Integer variationId) {
        List<Commit> commits = commitRepository.findLatestCommitByVariationId(variationId);
        try {
        	CommitDto dto = new CommitDto();
            BeanUtils.copyProperties(commits.get(0),dto);

        	System.out.println("COMMIT CONTROLLER :::"+dto);
            return dto;
        } catch (Exception e) {
            // Handle or log the exception as appropriate
            throw new RuntimeException("Error converting to DTO", e);
        }
    }
    

}
