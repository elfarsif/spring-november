import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { VariationDTO } from 'src/app/models/variation-dto.model';

@Injectable({
  providedIn: 'root',
})
export class SelectedVariationService {
  private sharedDataSubject = new BehaviorSubject<any>(null);

  sharedData$ = this.sharedDataSubject.asObservable();

  updateSharedData(data: any) {
    this.sharedDataSubject.next(data);
  }
}
