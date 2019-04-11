import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-director-delete-dialog',
  templateUrl: './director-delete-dialog.component.html',
  styleUrls: ['./director-delete-dialog.component.css']
})
export class DirectorDeleteDialogComponent implements OnInit {

  constructor(
    public DialogRef: MatDialogRef<DirectorDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  ngOnInit() {
  }

  onCloseConfirm() {
    this.DialogRef.close('Confirm');
  }
  onCloseCancel() {
    this.DialogRef.close('Cancel');
  }

}
