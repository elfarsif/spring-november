import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user-dto.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-account-setting-page',
  templateUrl: './account-setting-page.component.html',
  styleUrls: ['./account-setting-page.component.css'],
})
export class AccountSettingPageComponent {
  accountForm!: FormGroup;

  constructor(
    private sharedService: SharedService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.accountForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
    this.sharedService.user$.subscribe(
      (user) => {
        if (user) {
          this.accountForm = this.fb.group({
            username: [user.username, Validators.required],
            password: [user.password, Validators.required],
            email: [user.email, [Validators.required, Validators.email]],
          });
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  saveChanges() {
    if (this.accountForm.valid) {
      console.log('Save changes clicked');
      const formValues = this.accountForm.value;

      const username = formValues.username;
      const password = formValues.password;
      const email = formValues.email;

      const user: User = {
        id: 0,
        username: username,
        email: email,
        password: password,
      };
      this.authService.updateUser(user).subscribe(
        (response) => {
          console.log(response);
          this.refreshCurrentRoute();
          this.authService.logout();
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  private refreshCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
