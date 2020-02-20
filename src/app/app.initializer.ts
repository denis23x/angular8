import {Injectable, Injector} from '@angular/core';
import {CollectionsService} from './services/collections.service';
import {NoteListComponent} from './views/note-list/note-list.component';
import {Route, Router} from '@angular/router';
import {NoteDetailComponent} from './views/note-detail/note-detail.component';

@Injectable({
  providedIn: 'root'
})
export class AppInitializer {
  constructor(
    private injector: Injector
  ) { }

  init(): Promise<any> {
    const collectionsService = this.injector.get(CollectionsService);
    const router = this.injector.get(Router);

    return new Promise((resolve, reject) => {
      collectionsService.getCollectionsList().subscribe(collections => {
        const routes = Array.from(collections, ({ path }) => {
          return {
            path,
            component: NoteListComponent,
            children: [
              {
                path: ':id',
                component: NoteDetailComponent
              }
            ]
          } as Route;
        });

        router.resetConfig(routes.concat(router.config));
        resolve();
      });
    });
  }
}
