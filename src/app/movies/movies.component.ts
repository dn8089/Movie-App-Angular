import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MoviesService } from '../movies.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[];
  displayedColumns: string[] = ['id', 'name', 'genre', 'year', 'directorId', 'details', 'edit', 'delete'];
  directorId: number;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies(): void {
    const path = this.route.snapshot.url[0].path;
    console.log(path);
    if (path === 'director-movies') {
      this.directorId = +this.route.snapshot.paramMap.get('id');
      console.log(this.directorId);
      this.moviesService.getMovies().subscribe(movies => this.movies = movies.filter(m => m.DirectorId == this.directorId));
    } else {
      this.moviesService.getMovies().subscribe(movies => this.movies = movies);
    }
  }

  getDetails(id: number): void {
    this.router.navigate([`/detail-movie/${id}`]);
  }

  edit(id: number): void {
    this.router.navigate([`/edit-movie/${id}`]);
  }

  delete(id: number): void {
    this.movies = this.movies.filter(m => m.Id != id);
    this.moviesService.deleteMovie(id).subscribe();
  }

}
