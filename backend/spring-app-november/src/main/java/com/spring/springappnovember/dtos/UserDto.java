package com.spring.springappnovember.dtos;

import lombok.Data;

@Data
public class UserDto {
    private Long id;
    private String username;
    private String email;
    // Note: Password is typically not included in a DTO for security reasons.
}