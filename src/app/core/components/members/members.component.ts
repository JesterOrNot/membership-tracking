import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { IClubMember } from '../../../shared/models/club-member.model';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DialogService } from '../../services/dialog.service'
import { ReactiveFormsModule } from '@angular/forms';
import { MemberNumberService } from '../../services/member-number.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

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
    // get all records to populate the table
    this.httpService.getMembers().subscribe(members => {
      if (members != null) {
        this.rows = members;
        console.log('this rows', this.rows);
      }
    });

    //get the next available member ID number for new members
    this.memberNumberService.findNextAvailableId();

    // edit mode will toggle based on clicking New or Edit
    this.httpService.editMode.subscribe(mode => {
      this.isEditMode = mode;
    });


    this.httpService.newRows$.subscribe(value => {
      console.log('value from members subscription', value);
      this.rows = [...value];
    });

    this.memberNumberService.nextAvailableMemberNumber$.subscribe(number => {
      this.newId = number;
      console.log('next id is', this.newId);
    });
  }

  editMemberClick(rowId: any) {
    this.httpService.editMode.next(true);
    console.log('edit row', rowId);

    this.httpService.getMember(rowId).subscribe(info => {
      this.dialogService.memberInfo = info;
      this.httpService.editMode.next(true);
      console.log('editing member data', info);
      this.dialogService.openMemberDetailDialog(this.dialogService.memberInfo, rowId);
    })

  }

  addMemberClick() {
    this.httpService.editMode.next(false);
    console.log('add member', this.isEditMode);
    this.dialogService.openMemberDetailDialog();
  }

  deleteMemberClick(row: any) {
    console.log('deleting', row);
    this.dialogService.openDeleteDialog({
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName });
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
    // future use, trigger when the address row is exposed
  }

}

