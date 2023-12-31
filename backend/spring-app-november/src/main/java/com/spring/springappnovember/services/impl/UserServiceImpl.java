package com.spring.springappnovember.services.impl;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.springappnovember.dtos.RecipeDto;
import com.spring.springappnovember.dtos.UserDto;
import com.spring.springappnovember.entities.Recipe;
import com.spring.springappnovember.entities.User;
import com.spring.springappnovember.repositories.RecipeRepository;
import com.spring.springappnovember.repositories.UserRepository;
import com.spring.springappnovember.services.RecipeService;
import com.spring.springappnovember.services.UserService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
    private final UserRepository userRepository;
    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto createUser(UserDto userDto) {
        User user = new User();
        BeanUtils.copyProperties(userDto, user);
        user = userRepository.save(user);
        BeanUtils.copyProperties(user, userDto);
        
        return userDto;
    }

    @Override
    public UserDto updateUser(Long id, UserDto userDto) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        userDto.setId(id);
        BeanUtils.copyProperties(userDto, user);
        user = userRepository.save(user);
        BeanUtils.copyProperties(user, userDto);
        return userDto;
    }

    @Override
    public UserDto getUserById(Long id) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
        UserDto userDto = new UserDto();
        BeanUtils.copyProperties(user, userDto);
        return userDto;
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream().map(user -> {
            UserDto userDto = new UserDto();
            BeanUtils.copyProperties(user, userDto);
            return userDto;
        }).collect(Collectors.toList());
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    @Override
    public UserDto authenticate(String username, String password) {
    	User user = userRepository.findByUsername(username);
    	System.out.println("UserServiceImpl.authenticate "+user);
    	if (user != null && password.equals(user.getPassword())) { 
    		UserDto userDTO = new UserDto();
            BeanUtils.copyProperties(user, userDTO);
            System.out.println(userDTO);
            return userDTO;
        }
    	return null;
    }
}