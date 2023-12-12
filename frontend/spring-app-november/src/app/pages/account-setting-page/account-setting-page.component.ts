import { Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-account-setting-page',
  templateUrl: './account-setting-page.component.html',
  styleUrls: ['./account-setting-page.component.css'],
})
export class AccountSettingPageComponent {
  username: string = '';
  password: string = '';
  email: string = '';

  constructor(private sharedService: SharedService) {}

  ngOnInit() {}

  saveChanges() {
    // Implement your save changes logic here
    console.log('Save changes clicked');
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    console.log('Email:', this.email);
  }
}
