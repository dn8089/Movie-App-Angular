import { NgModule } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';

import { DirectorsComponent } from './directors/directors.component';
import { DirectorDetailComponent } from './director-detail/director-detail.component';
import { MoviesComponent } from './movies/movies.component';
import { DirectorFormComponent } from './director-form/director-form.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieFormComponent } from './movie-form/movie-form.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/logIn', pathMatch: 'full' },
  { path: 'directors', component: DirectorsComponent },
  { path: 'detail-director/:id', component: DirectorDetailComponent },  
  { path: 'edit-director/:id', component: DirectorFormComponent, canActivate: [AuthGuard] },
  { path: 'add-director', component: DirectorFormComponent, canActivate: [AuthGuard] },
  { path: 'movies', component: MoviesComponent },
  { path: 'detail-movie/:id', component: MovieDetailComponent},
  { path: 'add-movie', component: MovieFormComponent, canActivate: [AuthGuard] },
  { path: 'edit-movie/:id', component: MovieFormComponent, canActivate: [AuthGuard] },
  { path: 'director-movies/:id', component: MoviesComponent },
  { path: 'logIn', component: LoginComponent },
  { path: 'registration', component: RegisterComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutnigModule { }
