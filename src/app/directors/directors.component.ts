import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { DirectorsService } from '../directors.service';
import { Director } from '../director';
import { DirectorDeleteDialogComponent } from '../director-delete-dialog/director-delete-dialog.component';
import { from } from 'rxjs';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent implements OnInit {

  //director= 'XXXX';
  //director: string;
  directors: Director[];
  displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'details', 'edit', 'delete', 'movies'];
  dialogResult;

  constructor(
    private directorsService : DirectorsService,
    private router: Router, 
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getDirectors();
  }

  getDirectors(): void {
    this.directorsService.getDirectors().subscribe(directors => this.directors = directors);
  }

  getDetails(id: number): void {
    this.router.navigate([`/detail-director/${id}`]);
  }

  edit(id: number): void {
    this.router.navigate([`/edit-director/${id}`]);
  }

  openDialog(id: number): void {
    var dialogRef = this.dialog.open(DirectorDeleteDialogComponent, {
      width: '600px',
      data: id
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed: ${result}`);
      this.dialogResult = result;
      this.delete(id)
    });
  }

  delete(id: number): void {
    console.log(`delete func ${id}`);
    if (this.dialogResult === 'Confirm' ) {
      this.directors = this.directors.filter(d => d.Id != id);
      this.directorsService.deleteDirector(id).subscribe();
    }
  }

  getMovies(id: number): void {
    this.router.navigate([`director-movies/${id}`]);
  }

}
