import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';

import { DirectorsService } from '../directors.service';
import { Director } from '../director';
import { DirectorDeleteDialogComponent } from '../director-delete-dialog/director-delete-dialog.component';

@Component({
  selector: 'app-directors',
  templateUrl: './directors.component.html',
  styleUrls: ['./directors.component.css']
})
export class DirectorsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'details', 'edit', 'delete', 'movies'];
  directorsDataSource = new MatTableDataSource<Director>();
  dialogResult;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private directorsService : DirectorsService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getDirectors();
    this.directorsDataSource.paginator = this.paginator;
  }

  getDirectors(): void {
    this.directorsService.getDirectors().subscribe(directors => this.directorsDataSource.data = directors);
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
      this.directorsDataSource.data = this.directorsDataSource.data.filter(d => d.Id != id);
      this.directorsService.deleteDirector(id).subscribe();
    }
  }

  getMovies(id: number): void {
    this.router.navigate([`director-movies/${id}`]);
  }

}
