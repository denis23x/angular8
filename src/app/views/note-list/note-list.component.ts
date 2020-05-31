import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '@services/api.service';
import { AuthService } from '@services/auth.service';
import { CollectionsService } from '@services/collections.service';
import { Note } from '@models/note';
import { UserInner } from '@models/user';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { Collection } from '@models/collection';
import Masonry from 'masonry-layout';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  @ViewChild('masonryInner', { static: false }) masonryInner: ElementRef;

  private currentUser: UserInner;
  private currentCollection: Collection;
  private notesList: Note[] = [];
  private notesListParams: any = {};
  private notesListSubject: Subject<Array<Note>> = new Subject<Array<Note>>();
  private loader = true;
  private masonry: Masonry;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private collectionsService: CollectionsService
  ) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe(({ user }) => {
      this.currentUser = user;
    });

    this.collectionsService.collections.subscribe((collections) => {
      this.currentCollection = collections.find(collection => collection.path === this.route.snapshot.routeConfig.path);
      this.getNotesList();
    });

    this.notesListSubject.subscribe(notes => {
      this.notesList = notes;

      const tick = setTimeout(() => {
        this.masonry = new Masonry(this.masonryInner.nativeElement, {
          itemSelector: '.masonry-card',
          columnWidth: '.masonry-sizer',
          percentPosition: true,
        });

        clearTimeout(tick);
        this.loader = false;
      });
    });
  }

  getNotesList(): void {
    if (this.isMyNotesView()) {
      this.notesListParams.user = this.currentUser.id;
    } else {
      this.notesListParams.collection = this.currentCollection.id;
    }

    this.apiService.getNotesList(this.notesListParams).subscribe(notes => {
      notes.length ? this.notesListSubject.next(Array.from(notes, note => new Note(note))) : this.loader = false;
    });
  }

  isMyNotesView(): boolean {
    return ['my-notes'].includes(this.route.snapshot.routeConfig.path);
  }
}






