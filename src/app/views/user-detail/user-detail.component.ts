import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {User, UserInner} from '../../models/user';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html'
})
export class UserDetailComponent implements OnInit {
  public isMy: boolean = Object.prototype.hasOwnProperty.call(this.route.snapshot.data, 'isMy');
  public currentUser: User = this.authService.currentUserValue;
  public currentUserDetail: UserInner;
  public routeSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getUserById();
  }

  getUserById(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      let id = params.id;

      if (this.isMy) {
        id = this.currentUser.user.id;
      }

      this.apiService.getUserById(id).subscribe(user => {
        this.currentUserDetail = user;
      });
    });
  }
}
