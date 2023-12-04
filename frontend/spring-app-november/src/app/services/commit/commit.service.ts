import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { CommitDTO } from 'src/app/models/commit-dto.model';
import { RecipeDTO } from 'src/app/models/recipe-dto.model';

@Injectable({
  providedIn: 'root',
})
export class CommitService {
  private apiUrl = 'http://localhost:5000/commits';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getCommitsByVariation(variationId: number): Observable<any[]> {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(`${this.apiUrl}/byVariation/${variationId}`, {
      headers,
    });
  }

  addNewCommit(
    variationId: number,
    message: string,
    instructions: string,
    results: string
  ) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    const currentDate = new Date();
    let timestamp = currentDate.toISOString();
    const payload = {
      variationId: variationId,
      message: message,
      results: results,
      instructions: instructions,
      timestamp: timestamp,
    };
    return this.http.post<any>(`${this.apiUrl}`, payload, { headers });
  }

  getLatestCommitByVariationId(variationId: number) {
    const token = this.cookieService.get('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<CommitDTO>(`${this.apiUrl}/latest/${variationId}`, {
      headers,
    });
  }
}
