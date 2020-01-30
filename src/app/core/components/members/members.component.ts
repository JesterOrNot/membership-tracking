import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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

  private newId: number;
  private member: IClubMember;
  private rows: Array<IClubMember> = [];
  private expanded: any = {};
  private timeout: any;
  private address_tooltip = 'Toggle address details';
  private edit_tooltip = "Edit this record";
  private delete_tooltip = "Delete this record";
  private isEditMode: boolean;

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
      }
    });

    // calculate the next available member ID number for new members
    this.memberNumberService.findNextAvailableId();

    // edit mode will toggle based on clicking New or Edit
    this.httpService.editMode.subscribe(mode => {
      this.isEditMode = mode;
    });


    this.httpService.newRows$.subscribe(value => {
      this.rows = [...value];
    });

    // get the next available member number from the Subject in the service
    this.memberNumberService.nextAvailableMemberNumber$.subscribe(number => {
      this.newId = number;
    });
  }

  editMemberClick(rowId: any) {
    this.httpService.editMode.next(true);
    this.httpService.getMember(rowId).subscribe(info => {
      this.dialogService.memberInfo = info;
      this.httpService.editMode.next(true);
      this.dialogService.openMemberDetailDialog(this.dialogService.memberInfo, rowId);
    });
  }

  // addMemberClick() {
  //   this.httpService.editMode.next(false);
  //   this.dialogService.openMemberDetailDialog();
  // }

  deleteMemberClick(row: any) {
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
    // future use, triggered when the address row is exposed
  }
}

