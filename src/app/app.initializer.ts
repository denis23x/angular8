import {Injectable, Injector} from '@angular/core';
import {CollectionsService} from './services/collections.service';
import {NoteListComponent} from './views/note-list/note-list.component';
import {Route, Router} from '@angular/router';

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
        const routes = Array.from(collections, col => {
          // @ts-ignore
          return { path: col.path, component: NoteListComponent } as Route;
        });

        router.resetConfig(routes.concat(router.config));
        resolve();
      });
    });
  }
}
