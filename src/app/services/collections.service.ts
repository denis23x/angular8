import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '@services/api.service';
import { Router } from '@angular/router';
import { Collection } from '@models/collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {
  private collectionsSubject: BehaviorSubject<Array<Collection>>;
  private collections: Observable<Array<Collection>>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.collectionsSubject = new BehaviorSubject<Array<Collection>>([]);
    this.collections = this.collectionsSubject.asObservable();
  }

  public get collectionsList(): Array<Collection> {
    return this.collectionsSubject.value;
  }

  public getCollectionsList(): Observable<any> {
    return this.apiService.getCollectionsList().pipe(map(collections => {
      this.collectionsSubject.next(Array.from(collections, ({ id, title, path, icon, created_at, updated_at, notes }) => {
        return new Collection(id, title, path, icon, created_at, updated_at, notes);
      }));

      return collections;
    }));
  }

}
