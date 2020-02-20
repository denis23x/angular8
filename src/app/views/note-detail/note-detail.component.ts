import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiService} from '../../services/api.service';
import {Note} from '../../models/note';
import {Subscription} from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html'
})
export class NoteDetailComponent implements OnInit {
  private note: Note;
  private routeSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private location: Location
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
