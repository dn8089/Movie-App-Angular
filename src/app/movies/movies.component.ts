import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

import { MoviesService } from '../movies.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

 // movies: Movie[];
  displayedColumns: string[] = ['id', 'name', 'genre', 'year', 'directorId', 'details', 'edit', 'delete'];
  moviesDataSource = new MatTableDataSource<Movie>();
  directorId: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getMovies();
    this.moviesDataSource.paginator = this.paginator;
  }

  getMovies(): void {
    const path = this.route.snapshot.url[0].path;
    console.log(path);
    if (path === 'director-movies') {
      this.directorId = +this.route.snapshot.paramMap.get('id');
      console.log(this.directorId);
      this.moviesService.getMovies().subscribe(movies => this.moviesDataSource.data = movies.filter(m => m.DirectorId == this.directorId));
    } else {
      console.log('else');
      this.moviesService.getMovies().subscribe(movies => this.moviesDataSource.data = movies);
    }
  }

  getDetails(id: number): void {
    this.router.navigate([`/detail-movie/${id}`]);
  }

  edit(id: number): void {
    this.router.navigate([`/edit-movie/${id}`]);
  }

  delete(id: number): void {
    this.moviesDataSource.data = this.moviesDataSource.data.filter(m => m.Id != id);
    this.moviesService.deleteMovie(id).subscribe();
  }

}
