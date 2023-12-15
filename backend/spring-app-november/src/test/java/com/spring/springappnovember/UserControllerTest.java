package com.spring.springappnovember;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.spring.springappnovember.controller.UserController;
import com.spring.springappnovember.dtos.UserDto;
import com.spring.springappnovember.services.UserService;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    @Test
    public void testGetUser() {
        // Arrange
        Long userId = 1L;
        UserDto mockUser = new UserDto();
        mockUser.setId(userId);
        mockUser.setUsername("user");
        mockUser.setPassword("pass");
        mockUser.setEmail("email@email");
        
        when(userService.getUserById(userId)).thenReturn(mockUser);

        // Act
        ResponseEntity<UserDto> responseEntity = userController.getUserById(userId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(mockUser, responseEntity.getBody());

        // Verify that userService.getUser() was called with the correct argument
        verify(userService).getUserById(userId);
    }
    
    @Test
    public void testUpdateUser() {
        // Arrange
        Long userId = 1L;
        UserDto userDto = new UserDto();
        userDto.setUsername("user");
        userDto.setPassword("pass");
        userDto.setEmail("email@email");

        when(userService.updateUser(userId, userDto)).thenReturn(userDto);

        // Act
        ResponseEntity<UserDto> responseEntity = userController.updateUser(userId, userDto);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(userDto, responseEntity.getBody());

        // Verify that userService.updateUser() was called with the correct arguments
        verify(userService).updateUser(userId, userDto);
    }
    
    @Test
    public void testGetAllUsers() {
        // Arrange
        UserDto userDto = new UserDto();
        userDto.setId(1L);
        userDto.setUsername("user1");
        userDto.setPassword("pass1");
        userDto.setEmail("email1@email");
        

        UserDto userDto2 = new UserDto();
        userDto.setId(2L);
        userDto.setUsername("user2");
        userDto.setPassword("pass2");
        userDto.setEmail("email2@email");
        
        List<UserDto> userList = List.of(
                userDto,
                userDto2
        );

        when(userService.getAllUsers()).thenReturn(userList);

        // Act
        ResponseEntity<List<UserDto>> responseEntity = userController.getAllUsers();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(userList, responseEntity.getBody());

        // Verify that userService.getAllUsers() was called
        verify(userService).getAllUsers();
    }

    @Test
    public void testDeleteUser() {
        // Arrange
        Long userId = 1L;

        // Act
        ResponseEntity<Void> responseEntity = userController.deleteUser(userId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify that userService.deleteUser() was called with the correct argument
        verify(userService).deleteUser(userId);
    }

    @Test
    public void testLoginSuccess() {
        // Arrange
        UserDto userDto = new UserDto();
        userDto.setUsername("user");
        userDto.setPassword("pass");

        when(userService.authenticate(userDto.getUsername(), userDto.getPassword())).thenReturn(userDto);

        // Act
        ResponseEntity<?> responseEntity = userController.login(userDto);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        // Additional assertions for the response content can be added based on the actual implementation

        // Verify that userService.authenticate() was called with the correct arguments
        verify(userService).authenticate(userDto.getUsername(), userDto.getPassword());
    }

    @Test
    public void testLoginFailure() {
        // Arrange
        UserDto userDto = new UserDto();
        userDto.setUsername("user");
        userDto.setPassword("incorrect_password");

        when(userService.authenticate(userDto.getUsername(), userDto.getPassword())).thenReturn(null);

        // Act and Assert
        ResponseEntity<?> responseEntity = userController.login(userDto);
        assertEquals(HttpStatus.BAD_REQUEST, responseEntity.getStatusCode());
        assertEquals("Invalid username or password", responseEntity.getBody());

        // Verify that userService.authenticate() was called with the correct arguments
        verify(userService).authenticate(userDto.getUsername(), userDto.getPassword());
    }

}
