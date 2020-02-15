import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {Note} from '../../models/note';
import {Collection} from '../../models/collection';
import {AuthService} from '../../services/auth.service';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html'
})
export class NotesComponent implements OnInit {
  public currentUser: User;
  public notesList: Note[] = [];
  public collectionsList: Collection[] = [];

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    const { id } = this.currentUser.user;

    this.apiService.getUserById(id).subscribe(({ collections, notes }) => {
      this.collectionsList = collections;
      this.notesList = notes;
    });
  }

}
