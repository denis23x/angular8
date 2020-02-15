import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Note} from '../../models/note';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html'
})
export class SharedComponent implements OnInit {
  public notesList: Note[];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getNotesList().subscribe(notes => {
      this.notesList = notes;
    });
  }
}
