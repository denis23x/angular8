import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Collection } from '@models/collection';
import { CollectionsService } from '@services/collections.service';
import { ApiService } from '@services/api.service';
import { environment } from '@environments/environment';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user';
import { NotificationService } from '@services/notification.service';

@Component({
  selector: 'app-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit {
  private backendHost: string = environment.backendHost;
  private currentCollection: Collection;
  private collectionsList: Array<Collection> = this.collectionsService.collectionsList;
  private currentUser: User = this.authService.currentUserValue;

  private addForm: FormGroup = this.formBuilder.group({
    title: ['', [ Validators.minLength(4), Validators.maxLength(40), Validators.required ] ],
    description: ['', [ Validators.minLength(40), Validators.maxLength(8000), Validators.required ] ],
    collection: [null, [ Validators.required ] ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private collectionsService: CollectionsService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private apiService: ApiService,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.addForm.valid) {
      const user = this.currentUser.user.id;
      const { title, description, collection } = this.addForm.value;

      this.apiService.postNote({ user, title, description, collection }).subscribe((response) => {
        this.notificationService.addNotify({
          className: 'is-success',
          message: 'Success',
          delay: 5000
        });
      });
    }
  }

  selectCollection(collection: Collection): void {
    this.currentCollection = collection;
    this.collectionControl.setValue(this.currentCollection.id);
  }

  get titleControl() { return this.addForm.get('title'); }
  get descriptionControl() { return this.addForm.get('description'); }
  get collectionControl() { return this.addForm.get('collection'); }

}
