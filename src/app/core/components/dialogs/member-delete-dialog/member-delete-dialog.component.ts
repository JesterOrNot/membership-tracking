import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-member-delete-dialog',
  templateUrl: './member-delete-dialog.component.html',
  styleUrls: ['./member-delete-dialog.component.css']
})
export class MemberDeleteDialogComponent {

  dialogConfig: MatDialogConfig;
  rowId: string;
  firstName: string;
  lastName: string;

  constructor(
    private httpService: HttpService,
    public dialogRef: MatDialogRef<MemberDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any) {
    this.rowId = row.id;
    this.firstName = row.firstName;
    this.lastName = row.lastName;
  }

  deleteConfirmedClick() {
    this.httpService.deleteMember(this.rowId);
    console.log('row id is ', this.rowId);
    this.dialogRef.close();
    this.httpService.refreshTable();
  }

  close() {
    this.dialogRef.close();
  }
}
