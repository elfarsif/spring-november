package com.spring.springappnovember.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.springappnovember.entities.Commit;

@Repository
public interface CommitRepository extends JpaRepository<Commit, Long> {
    // Additional query methods can be defined here
    List<Commit> findByVariationId(Integer variationId);
	
}