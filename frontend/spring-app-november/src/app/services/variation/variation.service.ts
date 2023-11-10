import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { VariationDTO } from 'src/app/models/variation-dto.model';

@Injectable({
  providedIn: 'root',
})
export class VariationService {
  private apiUrl = 'http://localhost:8080/variations';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getVariationsByRecipeId(recipeId: number): Observable<VariationDTO[]> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<VariationDTO[]>(`${this.apiUrl}/recipe/${recipeId}`, {
      headers,
    });
  }
}
