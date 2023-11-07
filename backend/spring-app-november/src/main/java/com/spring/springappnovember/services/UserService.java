package com.spring.springappnovember.services;

import java.util.List;

import com.spring.springappnovember.dtos.UserDto;

public interface UserService {
    UserDto createUser(UserDto userDto);
    UserDto updateUser(Long id, UserDto userDto);
    UserDto getUserById(Long id);
    List<UserDto> getAllUsers();
    void deleteUser(Long id);
	UserDto authenticate(String username, String password);
}
