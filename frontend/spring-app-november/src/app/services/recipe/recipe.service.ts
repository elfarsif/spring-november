import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { RecipeDTO } from 'src/app/models/recipe-dto.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private apiUrl = 'http://localhost:8080/api/recipes'; // Replace with your API endpoint

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
}
