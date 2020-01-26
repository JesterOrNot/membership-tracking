import { Injectable, OnInit, ApplicationRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { MemberDetailDialogComponent } from '../components/dialogs/member-detail-dialog/member-detail-dialog.component'
import { MemberDeleteDialogComponent } from '../components/dialogs/member-delete-dialog/member-delete-dialog.component'
import { IClubMember } from '../../shared/models/club-member.model';
import { HttpService } from './http.service';
import { Subscription } from 'rxjs';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';
import { Router } from '@angular/router';

export interface IDialogData {
  rowId: string,
  firstName?: string,
  lastName?: string
}

@Injectable({
  providedIn: 'root'
})
export class DialogService implements OnInit {

  private subscriptions: Subscription[] = [];
  public rows: Array<IClubMember> = [];
  public memberInfo: any;
  private detailDialogRef: any;
  private deleteDialogRef: any;
  public rowNumber: any;
  public memberSinceDate: string;
  public todaysDate: string;
  public isEditMode: boolean;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    public httpService: HttpService,
    private dateFormatPipe: DateFormatPipe,
    private applicationRef: ApplicationRef
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.httpService.getMembers().subscribe(members => {
        this.rows = members;
      }));
  }

  formatMemberSinceDate(value: Date) {
    this.todaysDate = this.dateFormatPipe.transform(value);
  }

  openMemberDetailDialog(memberData?: IClubMember) {
    if (this.isEditMode) {
      memberData.editMode = true;
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '690px';
    dialogConfig.height = '530px';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    if (this.isEditMode) {
      dialogConfig.data = memberData;
      dialogConfig.autoFocus = false;
    }
    this.detailDialogRef = this.dialog.open(MemberDetailDialogComponent, dialogConfig);
  }

  openDeleteDialog(data: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '220px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.data = data;
    this.deleteDialogRef = this.dialog.open(MemberDeleteDialogComponent, dialogConfig);
    this.subscriptions.push(
      this.deleteDialogRef.afterClosed().subscribe(() => {
        this.httpService
          .getMembers()
          .subscribe(members => (this.rows = members));
      }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}