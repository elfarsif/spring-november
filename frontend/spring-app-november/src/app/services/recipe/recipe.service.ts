import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { RecipeDTO } from 'src/app/models/recipe-dto.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:8080/api/recipes';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getRecipeByUsername(): Observable<RecipeDTO[]> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<RecipeDTO[]>(`${this.apiUrl}/username`, {
      headers,
    });
  }

  postNewRecipe(title: string, userId: number) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const payload = {
      title: title,
      user: {
        id: userId,
      },
    };
    return this.http.post<RecipeDTO>(`${this.apiUrl}`, payload, { headers });
  }

  updateRecipe(recipe: RecipeDTO) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const payload: RecipeDTO = recipe;
    return this.http.put<RecipeDTO>(
      `${this.apiUrl}/${recipe.recipeId}`,
      payload,
      { headers }
    );
  }

  deleteRecipe(recipeId: number) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/${recipeId}`, { headers });
  }
}
