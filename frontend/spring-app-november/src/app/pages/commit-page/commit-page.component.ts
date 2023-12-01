import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CommitDTO } from 'src/app/models/commit-dto.model';
import { CommitService } from 'src/app/services/commit/commit.service';

@Component({
  selector: 'app-commit-page',
  templateUrl: './commit-page.component.html',
  styleUrls: ['./commit-page.component.css'],
})
export class CommitPageComponent {
  variationId!: number;
  commits!: any[];

  constructor(
    private commitService: CommitService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.variationId = +params['id'];
    });
    this.loadRecipes();
  }
  loadRecipes() {
    this.commitService.getCommitsByVariation(this.variationId).subscribe(
      (data) => {
        this.commits = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
