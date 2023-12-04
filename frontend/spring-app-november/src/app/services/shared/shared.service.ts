import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CommitDTO } from 'src/app/models/commit-dto.model';
import { VariationDTO } from 'src/app/models/variation-dto.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //Selected Varation variable
  private selectedVariationSubject = new BehaviorSubject<VariationDTO | null>(
    null
  );
  selectedVariation$: Observable<VariationDTO | null> =
    this.selectedVariationSubject.asObservable();
  //Latest commit
  private latestCommitSubject = new BehaviorSubject<CommitDTO | null>(null);
  latestCommit$: Observable<CommitDTO | null> =
    this.latestCommitSubject.asObservable();

  setSelectedVariation(variation: any): void {
    this.selectedVariationSubject.next(variation);
  }
  setLatestCommit(commit: CommitDTO | null): void {
    this.latestCommitSubject.next(commit);
  }
}
