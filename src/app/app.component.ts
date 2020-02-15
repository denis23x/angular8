import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import {User} from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'appdev';
  currentUser: User;

  constructor(
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  clickLogout() {
    this.authService.logout();
  }
}
