import { Component, OnInit } from '@angular/core';
import { AuthService } from '@services/auth.service';
import { CollectionsService } from '@services/collections.service';
import { environment } from '@environments/environment';
import { UserInner } from '@models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  private userDetail: UserInner;
  private backendHost: string = environment.backendHost;
  private toggleNavbar = false;

  constructor(
    private authService: AuthService,
    private collectionsService: CollectionsService,
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(({ user }) => {
      this.userDetail = new UserInner(user);
    });
  }

  onLogout(): void {
    this.authService.logout();
  }
}
