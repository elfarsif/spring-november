package com.spring.springappnovember.repositories;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.springappnovember.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}