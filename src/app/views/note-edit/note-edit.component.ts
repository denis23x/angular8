import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Collection } from '@models/collection';
import { CollectionsService } from '@services/collections.service';
import { ApiService } from '@services/api.service';
import { environment } from '@environments/environment';
import { AuthService } from '@services/auth.service';
import { NotificationService } from '@services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {
  private backendHost: string = environment.backendHost;

  private addForm: FormGroup = this.formBuilder.group({
    user: [this.authService.currentUserValue.user.id, [ Validators.required ] ],
    title: ['', [ Validators.minLength(4), Validators.maxLength(40), Validators.required ] ],
    description: ['', [ Validators.minLength(40), Validators.maxLength(8000), Validators.required ] ],
    collection: [0, [ Validators.min(1), Validators.required ] ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private collectionsService: CollectionsService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      const { user, title, description, collection } = this.addForm.value;

      this.apiService.postNote({ user, title, description, collection }).subscribe(() => {
        this.notificationService.addNotify({
          className: 'is-success',
          message: 'Success',
          delay: 5000
        });

        this.router.navigate(['/my-notes']).then(() => {
          console.warn('succes navigate');
        });
      });
    }
  }

  onInsertMarkdownIt(str: string): void {
    this.descriptionControl.setValue(`${this.descriptionControl.value}\n${str}\n`);
  }

  // TODO: handle draft
  onInDraft(): void {
    localStorage.setItem('draftNote', JSON.stringify(this.addForm.value));

    this.notificationService.addNotify({
      className: 'is-success',
      message: 'Saved',
      delay: 5000
    });
  }

  get titleControl(): AbstractControl { return this.addForm.get('title'); }
  get descriptionControl(): AbstractControl { return this.addForm.get('description'); }
  get collectionControl(): AbstractControl { return this.addForm.get('collection'); }

  get currentCollection(): Collection {
    return this.collectionsService.collectionsList.filter(c => c.id === this.collectionControl.value)[0];
  }

}
