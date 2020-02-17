import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AuthService} from '../../services/auth.service';
import {Note} from '../../models/note';
import {User} from '../../models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html'
})
export class NoteListComponent implements OnInit {
  public isMy: boolean = Object.prototype.hasOwnProperty.call(this.route.snapshot.data, 'isMy');
  public currentUser: User = this.authService.currentUserValue;
  public notesList: Note[] = [];
  public notesListParams: any = {};

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getNotesList();
  }

  getNotesList(): void {
    if (this.isMy) {
      this.notesListParams.user = this.currentUser.user.id;
    } else if (this.route.snapshot.params.id) {
      this.notesListParams.user = this.route.snapshot.params.id;
    }

    this.apiService.getNotesList(this.notesListParams).subscribe(notes => {
      this.notesList = Array.from(notes, ({ id, title, description, created_at, updated_at, user, collections }) => {
        return new Note(id, title, description, created_at, updated_at, user, collections);
      });
    });
  }

  isMyNote(id: number): boolean {
    return this.currentUser ? this.currentUser.user.id === id : false;
  }
}






