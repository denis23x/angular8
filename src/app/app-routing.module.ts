import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { JoinComponent } from './views/join/join.component';
import { NoteListComponent } from './views/note-list/note-list.component';
import { NoteDetailComponent } from './views/note-detail/note-detail.component';
import { UserListComponent } from './views/user-list/user-list.component';
import { UserDetailComponent } from './views/user-detail/user-detail.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'join', component: JoinComponent },
  {
    path: 'notes',
    component: NoteListComponent,
  },
  {
    path: 'notes/:id',
    component: NoteDetailComponent
  },
  {
    path: 'my-notes',
    component: NoteListComponent,
    canActivate: [ AuthGuard ],
    data: { isMy: true }
  },
  {
    path: 'my-notes/:id',
    component: NoteDetailComponent,
    canActivate: [ AuthGuard ],
    data: { isMy: true }
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
    children: [
      {
        path: '',
        component: NoteListComponent,
        outlet: 'notes'
      }
    ]
  },
  {
    path: 'profile',
    component: UserDetailComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        component: NoteListComponent,
        outlet: 'notes'
      }
    ],
    data: { isMy: true }
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
