package com.spring.springappnovember.dtos;

import lombok.Data;

@Data
public class UserDto {
	
	private Long id;
    private String username;
    private String email;
    private String password;
    
    // Password should not be included in a DTO for security reasons.
}