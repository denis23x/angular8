import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {User, UserInner} from '../../models/user';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  private currentUser: User = this.authService.currentUserValue;
  private currentUserDetail: UserInner;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(): void {
    const userId = this.isProfileView() ? this.currentUser.user.id : this.route.snapshot.params.id;

    // tslint:disable-next-line:max-line-length
    this.apiService.getUserById(userId).subscribe(({ id, username, email, provider, confirmed, blocked, role, created_at, updated_at, notes, collections }) => {
      // tslint:disable-next-line:max-line-length
      this.currentUserDetail = new UserInner(id, username, email, provider, confirmed, blocked, role, created_at, updated_at, notes, collections);
    });
  }

  isProfileView(): boolean {
    return ['profile'].includes(this.route.snapshot.routeConfig.path);
  }
}
