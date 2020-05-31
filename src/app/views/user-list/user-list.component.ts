import { Component, OnInit } from '@angular/core';
import { ApiService } from '@services/api.service';
import { UserInner} from '@models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  private usersList: UserInner[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.apiService.getUsersList().subscribe(users => {
      this.usersList = Array.from(users, user => new UserInner(user));
    });
  }

}
