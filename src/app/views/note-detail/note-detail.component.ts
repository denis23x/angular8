import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Note} from '../../models/note';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html'
})
export class NoteDetailComponent implements OnInit {
  public note: Note;
  public routeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
  ) { }

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params.subscribe(({ id }) => {
      this.apiService.getNoteById(id).subscribe(note => {
        this.note = note;
        console.log(this.note);
      });
    });
  }

}
