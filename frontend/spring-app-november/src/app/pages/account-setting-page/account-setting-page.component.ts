import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-account-setting-page',
  templateUrl: './account-setting-page.component.html',
  styleUrls: ['./account-setting-page.component.css'],
})
export class AccountSettingPageComponent {
  accountForm!: FormGroup;

  constructor(private sharedService: SharedService, private fb: FormBuilder) {}

  ngOnInit() {
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
    } else {
      console.log('Form is invalid');
    }
  }
}
