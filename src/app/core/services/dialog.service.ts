import { Injectable, OnInit, ApplicationRef } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MemberDetailDialogComponent } from '../components/dialogs/member-detail-dialog/member-detail-dialog.component'
import { MemberDeleteDialogComponent } from '../components/dialogs/member-delete-dialog/member-delete-dialog.component'
import { IClubMember } from '../../shared/models/club-member.model';
import { HttpService } from './http.service';
import { Subscription } from 'rxjs';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';

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
  private isEditMode: boolean;

  constructor(
    private dialog: MatDialog,
    public httpService: HttpService,
    private dateFormatPipe: DateFormatPipe,
    private applicationRef: ApplicationRef
  ) { }

  ngOnInit() {
    this.httpService.getMembers().subscribe(members => {
      this.rows = members;
    });
  }

  formatMemberSinceDate(value: Date) {
    this.todaysDate = this.dateFormatPipe.transform(value);
  }

  openMemberDetailDialog(memberData?: IClubMember, recordId?: string) {
    this.httpService.editMode.subscribe(mode => {
      this.isEditMode = mode;
    });
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '690px';
    dialogConfig.height = '500px';
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.id = 'detail-dialog';

    if (this.isEditMode) {
      dialogConfig.data = { data: memberData, key: recordId };
      dialogConfig.autoFocus = false;
    }
    this.detailDialogRef = this.dialog.open(MemberDetailDialogComponent, dialogConfig);
  }

  openDeleteDialog(data: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.width = '400px';
    dialogConfig.height = '220px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.id = "delete-dialog";
    dialogConfig.data = data;
    this.deleteDialogRef = this.dialog.open(MemberDeleteDialogComponent, dialogConfig);
  }
}