import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DirectorsService } from '../directors.service';

import { Director } from '../director';

@Component({
  selector: 'app-director-detail',
  templateUrl: './director-detail.component.html',
  styleUrls: ['./director-detail.component.css']
})
export class DirectorDetailComponent implements OnInit {

  director: Director;
  id = +this.route.snapshot.paramMap.get('id'); //Route parameters are always strings. The JavaScript (+) operator converts the string to a number, which is what a hero id should be.

  constructor(
    private route: ActivatedRoute,
    private directorService: DirectorsService
  ) { }

  ngOnInit() {
    this.getDirector();
  }

  getDirector() : void {
    this.directorService.getDirector(this.id)
      .subscribe(director => this.director = director);
  }
}
