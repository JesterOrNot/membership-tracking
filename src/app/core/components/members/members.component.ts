import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IClubMember } from '../../../shared/models/club-member.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription, BehaviorSubject } from 'rxjs';
import { DialogService } from '../../services/dialog.service'
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MembersComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @ViewChild('memberTable', { static: false }) table: any;

  newId: number;
  member: IClubMember;
  rows: Array<IClubMember> = [];
  expanded: any = {};
  timeout: any;
  address_tooltip = 'Toggle address details';
  edit_tooltip = "Edit this record";
  delete_tooltip = "Delete this record";

  ColumnMode = ColumnMode;

  constructor(
    public httpService: HttpService,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.httpService.getMembers().subscribe(members => {
        this.rows = members;
      }));
    this.httpService.newRows$.subscribe(value => {
      this.rows = [...value];
    })
  }

  editMemberClick(rowId: any) {
    this.subscriptions.push(
      this.httpService.getMember(rowId).subscribe(info => {
        this.dialogService.memberInfo = info;
        this.dialogService.isEditMode = true;
        this.dialogService.openMemberDetailDialog(this.dialogService.memberInfo);
      })
    );
  }

  addMemberClick() {
    this.dialogService.isEditMode = false;
    this.dialogService.openMemberDetailDialog();
  }

  deleteMemberClick(row: any) {
    this.dialogService.openDeleteDialog({ id: row.id, firstName: row.firstName, lastName: row.lastName });
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
    }, 100);
  }

  toggleExpandRow(row: any) {
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    // future use
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

