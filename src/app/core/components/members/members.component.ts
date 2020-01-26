import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IClubMember } from '../../../shared/models/club-member.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subscription, BehaviorSubject } from 'rxjs';
import { DialogService } from '../../services/dialog.service'
import { ReactiveFormsModule } from '@angular/forms';
import { MemberNumberService } from '../../services/member-number.service';

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
  isEditMode: boolean;

  ColumnMode = ColumnMode;

  constructor(
    public httpService: HttpService,
    public dialogService: DialogService,
    private memberNumberService: MemberNumberService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.httpService.getMembers().subscribe(members => {
        if (members != null) {
        console.log('subscribe onInit', members);
        this.rows = members;
        console.log('rows from members',this.rows);

        this.memberNumberService.idArray = [...members];
        console.log('idArray in memberNumberService', this.memberNumberService.idArray[0]);
        //good to here
        this.memberNumberService.findNextAvailableId();
      }}));


    this.httpService.editMode.subscribe(mode => {
      this.isEditMode = mode;
    });

    this.httpService.newRows$.subscribe(value => {
      this.rows = [...value];
    });
  }

  editMemberClick(rowId: any) {
    this.httpService.editMode.next(true);
    console.log('delete row', rowId);
    this.subscriptions.push(
      this.httpService.getMember(rowId).subscribe(info => {
        this.dialogService.memberInfo = info;
        this.httpService.editMode.next(true);
        this.dialogService.openMemberDetailDialog(this.dialogService.memberInfo);
      })
    );
  }

  addMemberClick() {
    this.httpService.editMode.next(false);
    console.log('add member', this.isEditMode);
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

