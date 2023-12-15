package com.spring.springappnovember;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.spring.springappnovember.controller.RecipeController;
import com.spring.springappnovember.dtos.RecipeDto;
import com.spring.springappnovember.services.RecipeService;

import java.util.List;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@AutoConfigureMockMvc
public class RecipeControllerTest {

    @Mock
    private RecipeService recipeService;

    @InjectMocks
    private RecipeController recipeController;

    @Test
    public void testCreateRecipe() {
        // Arrange
        RecipeDto recipeDto = new RecipeDto();
        recipeDto.setTitle("Recipe Title");

        when(recipeService.createRecipe(recipeDto)).thenReturn(recipeDto);

        // Act
        ResponseEntity<RecipeDto> responseEntity = recipeController.createRecipe(recipeDto);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(recipeDto, responseEntity.getBody());

        // Verify that recipeService.createRecipe() was called with the correct argument
        verify(recipeService).createRecipe(recipeDto);
    }

    @Test
    public void testUpdateRecipe() {
        // Arrange
        Long recipeId = 1L;
        RecipeDto recipeDto = new RecipeDto();
        recipeDto.setTitle("Updated Recipe Title");

        when(recipeService.updateRecipe(recipeId, recipeDto)).thenReturn(recipeDto);

        // Act
        ResponseEntity<RecipeDto> responseEntity = recipeController.updateRecipe(recipeId, recipeDto);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(recipeDto, responseEntity.getBody());

        // Verify that recipeService.updateRecipe() was called with the correct arguments
        verify(recipeService).updateRecipe(recipeId, recipeDto);
    }

    @Test
    public void testGetAllRecipes() {
        // Arrange
        RecipeDto recipeDto = new RecipeDto();
        recipeDto.setRecipeId(1L);
        recipeDto.setTitle("Recipe 1");

        RecipeDto recipeDto2 = new RecipeDto();
        recipeDto2.setRecipeId(2L);
        recipeDto2.setTitle("Recipe 2");

        List<RecipeDto> recipeList = List.of(recipeDto, recipeDto2);

        when(recipeService.getAllRecipes()).thenReturn(recipeList);

        // Act
        ResponseEntity<List<RecipeDto>> responseEntity = recipeController.getAllRecipes();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(recipeList, responseEntity.getBody());

        // Verify that recipeService.getAllRecipes() was called
        verify(recipeService).getAllRecipes();
    }

    @Test
    public void testGetRecipeById() {
        // Arrange
        Long recipeId = 1L;
        RecipeDto recipeDto = new RecipeDto();
        recipeDto.setRecipeId(recipeId);
        recipeDto.setTitle("Recipe Title");

        when(recipeService.getRecipeById(recipeId)).thenReturn(recipeDto);

        // Act
        ResponseEntity<RecipeDto> responseEntity = recipeController.getRecipeById(recipeId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(recipeDto, responseEntity.getBody());

        // Verify that recipeService.getRecipeById() was called with the correct argument
        verify(recipeService).getRecipeById(recipeId);
    }

    @Test
    public void testDeleteRecipe() {
        // Arrange
        Long recipeId = 1L;

        // Act
        ResponseEntity<?> responseEntity = recipeController.deleteRecipe(recipeId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        // Verify that recipeService.deleteRecipe() was called with the correct argument
        verify(recipeService).deleteRecipe(recipeId);
    }
    
    @Test
    public void testGetRecipesByUserId() {
        // Arrange
        Long userId = 1L;
        RecipeDto recipeDto = new RecipeDto();
        recipeDto.setRecipeId(1L);
        recipeDto.setTitle("Recipe 1");

        RecipeDto recipeDto2 = new RecipeDto();
        recipeDto2.setRecipeId(2L);
        recipeDto2.setTitle("Recipe 2");

        List<RecipeDto> recipeList = List.of(recipeDto, recipeDto2);

        when(recipeService.getRecipesByUserId(userId)).thenReturn(recipeList);

        // Act
        ResponseEntity<List<RecipeDto>> responseEntity = recipeController.getRecipesByUserId(userId);

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(recipeList, responseEntity.getBody());

        // Verify that recipeService.getRecipesByUserId() was called with the correct argument
        verify(recipeService).getRecipesByUserId(userId);
    }

    @Test
    public void testGetRecipesByUsername() {
    	 // Arrange
        String username = "testUser";
        RecipeDto recipeDto = new RecipeDto();
        recipeDto.setRecipeId(1L);
        recipeDto.setTitle("Recipe 1");

        RecipeDto recipeDto2 = new RecipeDto();
        recipeDto2.setRecipeId(2L);
        recipeDto2.setTitle("Recipe 2");

        List<RecipeDto> recipeList = List.of(recipeDto, recipeDto2);

        // Mock the authentication
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(username);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        when(recipeService.findRecipesByUsername(username)).thenReturn(recipeList);

        // Act
        ResponseEntity<List<RecipeDto>> responseEntity = recipeController.getRecipesByUsername();

        // Assert
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(recipeList, responseEntity.getBody());

        // Verify that recipeService.findRecipesByUsername() was called with the correct argument
        verify(recipeService).findRecipesByUsername(username);
    }
    
    
}
