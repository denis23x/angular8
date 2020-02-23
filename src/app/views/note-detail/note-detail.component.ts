import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '@services/api.service';
import { Note } from '@models/note';
import { Location } from '@angular/common';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  private note: Note;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getNote();
  }

  getNote(): void {
    this.apiService.getNoteById(this.route.snapshot.params.id).subscribe(({ id, title, description, created_at, updated_at, user, collections }) => {
      this.note = new Note(id, title, description, created_at, updated_at, user, collections);
    });
  }
}
