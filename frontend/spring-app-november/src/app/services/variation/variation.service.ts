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

  postNewVariation(
    variationTitle: string,
    recipeId: number,
    userId: number,
    isMain: boolean
  ) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const payload = {
      variationTitle: variationTitle,
      instructions: '',
      isMain: isMain,
      recipe: {
        recipeId: recipeId,
        user: {
          id: userId,
        },
      },
    };
    return this.http.post<VariationDTO>(`${this.apiUrl}`, payload, { headers });
  }
  updateVariation(variation: VariationDTO) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const payload: VariationDTO = variation;
    return this.http.put<VariationDTO>(
      `${this.apiUrl}/${variation.variationId}`,
      payload,
      { headers }
    );
  }

  deleteVariation(variationId: number) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete(`${this.apiUrl}/${variationId}`, { headers });
  }

  getMainVariationByRecipeId(recipeId: number): Observable<VariationDTO[]> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<VariationDTO[]>(`${this.apiUrl}/main/${recipeId}`, {
      headers,
    });
  }
}
