import { NgModule } from '@angular/core';
import { RouterModule,  Routes } from '@angular/router';

import { DirectorsComponent } from './directors/directors.component';
import { DirectorDetailComponent } from './director-detail/director-detail.component';
import { MoviesComponent } from './movies/movies.component';
import { DirectorFormComponent } from './director-form/director-form.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieFormComponent } from './movie-form/movie-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/directors', pathMatch: 'full' },
  { path: 'directors', component: DirectorsComponent },
  { path: 'detail-director/:id', component: DirectorDetailComponent },  
  { path: 'edit-director/:id', component: DirectorFormComponent },
  { path: 'add-director', component: DirectorFormComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'detail-movie/:id', component: MovieDetailComponent},
  { path: 'add-movie', component: MovieFormComponent },
  { path: 'edit-movie/:id', component: MovieFormComponent },
  { path: 'director-movies/:id', component: MoviesComponent}
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
