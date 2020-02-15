import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './views/login/login.component';
import { JoinComponent } from './views/join/join.component';
import { ProfileComponent } from './views/profile/profile.component';
import { UsersComponent } from './views/users/users.component';
import { NotesComponent } from './views/notes/notes.component';
import { SharedComponent } from './views/shared/shared.component';
import { UserDetailComponent } from './views/user-detail/user-detail.component';
import { SharedDetailComponent } from './views/shared-detail/shared-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'notes',
    component: NotesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/:id',
    component: UserDetailComponent
  },
  {
    path: 'shared',
    component: SharedComponent
  },
  {
    path: 'shared/:id',
    component: SharedDetailComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'join', component: JoinComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
