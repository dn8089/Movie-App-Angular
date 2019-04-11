import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../movies.service';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie;

  id = +this.route.snapshot.paramMap.get('id'); //Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.

  constructor(
    private route: ActivatedRoute,
    private moviesService: MoviesService
  ) { }

  ngOnInit() {
    this.getMovie();
  }

  getMovie() : void {
    this.moviesService.getMovie(this.id).subscribe(movie => this.movie = movie);
  }

}
