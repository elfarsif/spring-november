package com.spring.springappnovember.services;



import java.util.List;
import java.util.Optional;

import com.spring.springappnovember.dtos.CommitDto;
import com.spring.springappnovember.entities.Commit;

public interface CommitService {
    CommitDto createCommit(CommitDto commitDto);
    List<CommitDto> getAllCommits();
    CommitDto getCommitById(Long commitId);
    List<CommitDto> getCommitsByVariationId(Integer variationId);
    // Additional methods as needed
	CommitDto getLatestCommitByVariationId(Integer variationId);
}