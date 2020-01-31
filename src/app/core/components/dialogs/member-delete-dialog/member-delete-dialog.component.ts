import { Component, OnInit, Inject, Input } from '@angular/core';
import { HttpService } from '../../../services/http.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { MemberNumberService } from 'src/app/core/services/member-number.service';

@Component({
  selector: 'app-member-delete-dialog',
  templateUrl: './member-delete-dialog.component.html',
  styleUrls: ['./member-delete-dialog.component.css']
})
export class MemberDeleteDialogComponent {

  dialogConfig: MatDialogConfig;
  recordId: string;
  firstName: string;
  lastName: string;

  constructor(
    private httpService: HttpService,
    public memberNumberService: MemberNumberService,
    public dialogRef: MatDialogRef<MemberDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public row: any) {
    this.recordId = row.id;
    this.firstName = row.firstName;
    this.lastName = row.lastName;
  }

  deleteConfirmedClick() {
    this.httpService.deleteMember(this.recordId);
    this.dialogRef.close();
    // number of records has changed, recalculate the next available member ID
    this.memberNumberService.findNextAvailableId();
    this.httpService.refreshTable();
  }

  close() {
    this.dialogRef.close();
  }
}
