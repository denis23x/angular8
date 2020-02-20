import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Collection} from '../../models/collection';
import {AuthService} from '../../services/auth.service';
import {CollectionsService} from '../../services/collections.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  private backendHost = environment.backendHost;
  private currentUser: User;
  private collections: Array<Collection> = [];
  private toggleNavbar = false;

  constructor(
    private authService: AuthService,
    private collectionsService: CollectionsService,
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
    this.collectionsService.collections.subscribe(x => this.collections = x);
  }

  ngOnInit() {
  }

  clickLogout() {
    this.authService.logout();
  }
}
