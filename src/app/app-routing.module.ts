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
    path: 'my-notes',
    component: NoteListComponent,
    canActivate: [ AuthGuard ],
  },
  {
    path: 'my-notes/:id',
    component: NoteDetailComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'users/:id',
    component: UserDetailComponent,
  },
  {
    path: 'profile',
    component: UserDetailComponent,
    canActivate: [ AuthGuard ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
