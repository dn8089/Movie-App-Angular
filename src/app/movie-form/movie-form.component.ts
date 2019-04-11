import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { MoviesService } from '../movies.service';
import { DirectorsService } from '../directors.service';
import { Movie } from '../movie';
import { Director } from '../director';

@Component({
  selector: 'app-movie-form',
  templateUrl: './movie-form.component.html',
  styleUrls: ['./movie-form.component.css']
})
export class MovieFormComponent implements OnInit {

  movie: Movie;
  directors: Director[];
  id: number;
  path = this.route.snapshot.url[0].path;
  title: string = 'Add movie';

  movieForm = this.formBuilder.group({
    Name: ['', [Validators.required, Validators.maxLength(200)]],
    Genre: ['', [Validators.required, Validators.maxLength(50)]],
    Year: ['', [Validators.required, Validators.min(1800)]],
    DirectorId: ['', Validators.required]
  });

  constructor(
    private moviesService: MoviesService, 
    private directorService: DirectorsService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.directorService.getDirectors().subscribe(directors => this.directors = directors);
    console.log(this.path);
    if (this.path === 'edit-movie') {
      this.id = +this.route.snapshot.paramMap.get('id');
      this.getMovie();
      this.title = 'Edit movie';
    }
  }

  get name() { return this.movieForm.get('Name'); }
  get genre() { return this.movieForm.get('Genre'); }
  get year() { return this.movieForm.get('Year'); }
  get director() { return this.movieForm.get('DirectorId')}

  onSubmit() : void {
    //console.log(this.movieForm.value);
    this.movie = this.movieForm.value;
    if (this.path === 'edit-movie') {
      this.movie.Id = this.id;
      this.moviesService.updateMovie(this.id, this.movie).subscribe(m => console.log(`Movie id: ${m.Id}`), err => console.error('Observer got an error: ' + err), () => this.moviesService.goBack());
    } else {
      this.moviesService.addMovie(this.movie).subscribe(m => console.log(`Movie id: ${m.Id}`), err => console.error('Observer got an error: ' + err), () => this.moviesService.goBack());
    }
  }

  getMovie() : void {
    this.moviesService.getMovie(this.id)
      .subscribe(m => {
        this.movie = m;
        this.movieForm.controls['Name'].setValue(m.Name);
        this.movieForm.controls['Genre'].setValue(m.Genre);
        this.movieForm.controls['Year'].setValue(m.Year);
        this.movieForm.controls['DirectorId'].setValue(m.DirectorId)
      });
  }

}
