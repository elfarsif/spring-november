package com.spring.springappnovember.services;



import java.util.List;

import com.spring.springappnovember.dtos.CommitDto;

public interface CommitService {
    CommitDto createCommit(CommitDto commitDto);
    List<CommitDto> getAllCommits();
    CommitDto getCommitById(Long commitId);
    List<CommitDto> getCommitsByVariationId(Integer variationId);
    // Additional methods as needed
}
