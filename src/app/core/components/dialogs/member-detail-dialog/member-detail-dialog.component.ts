import { Component, OnInit, Inject, Input, ViewChild, ElementRef, AfterViewInit, HostListener, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IClubMember } from '../../../../shared/models/club-member.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from '../../../services/http.service';
import { ZipcodeService } from '../../../services/zipcode.service';
import { ViewEncapsulation } from '@angular/core';
import { PhonePipe } from '../../../../shared/pipes/phone-format.pipe';
import { Subscription } from 'rxjs';
import { ActivityListService } from '../../../services/activities.service'
import { MemberNumberService } from 'src/app/core/services/member-number.service';

@Component({
  selector: 'app-member-detail-dialog',
  templateUrl: './member-detail-dialog.component.html',
  styleUrls: ['./member-detail-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MemberDetailDialogComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  memberModel: IClubMember;
  memberForm: FormGroup;
  submitted = false;
  memberSince: string;
  memberNumber: any;
  zipcodeResult: string = "";
  cityName: string = "";
  stateAbbr: string = "";
  isEditMode: boolean;
  activities: any;
  actionType: string; //remove this
  selected = 'None';
  nextAvailableMemberNumber: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MemberDetailDialogComponent>,
    private httpService: HttpService,
    public zipcodeService: ZipcodeService,
    private phoneFormatPipe: PhonePipe,
    public memberNumberService: MemberNumberService,
    private activityListService: ActivityListService
  ) { }

  ngOnInit() {
    this.initForm();
    this.memberNumberService.nextAvailableMemberNumber$
      .subscribe(number => {
        this.nextAvailableMemberNumber = number;
    });
    console.log('oninit member detail, next number', this.nextAvailableMemberNumber);
    this.httpService.editMode.subscribe(mode => {
      this.isEditMode = mode;
    })

    if (this.data != null) {
      if (this.isEditMode) {
        this.memberNumber = this.data.memberId;
        this.memberSince = this.data.memberSince;
        this.actionType = "Edit";
        this.loadEditValues(this.data);
      }
    }
    else { // adding a new record
      this.httpService.editMode.next(false);
      this.memberNumber = this.nextAvailableMemberNumber;
      this.actionType = "Add New"
      this.memberSince = new Date().toLocaleDateString();
    }
    this.activities = this.activityListService.getActivities();
  }

  initForm() {
    this.memberForm = new FormGroup({
      'memberId': new FormControl(null),
      'memberSince': new FormControl(null),
      'favoriteActivity': new FormControl(null),
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'address': new FormGroup({
        'street': new FormControl(null, Validators.required),
        'city': new FormControl(null, Validators.required),
        'state': new FormControl(null, Validators.required),
        'zipcode': new FormControl(null, Validators.required),
        'phoneNumber': new FormControl(null)
      })
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.memberForm.get(controlName).hasError(errorName);
  }

  loadEditValues(data) {
    let newValues = {
      memberId: data.memberId,
      firstName: data.firstName,
      lastName: data.lastName,
      memberSince: data.memberSince,
      favoriteActivity: data.favoriteActivity,
      address: {
        street: data.address.street,
        city: data.address.city,
        state: data.address.state,
        zipcode: data.address.zipcode,
        phoneNumber: this.phoneFormatPipe.transform(data.address.phoneNumber)
      }
    }
    this.memberForm.setValue(newValues);
  }

  lookupZipcode(zipcode: string) {
    this.subscriptions.push(
      this.zipcodeService.getCityState(zipcode).subscribe(data => {
        this.cityName = data.city;
        this.stateAbbr = data.state;
        this.zipcodeResult = data.zip_code;
        console.log('zip result is', this.cityName + ", " + this.stateAbbr + " " + this.zipcodeResult);
      })
    )
  }

  onSubmit() {
    console.log('oninit member detail submit, next number', this.nextAvailableMemberNumber);
    if (this.isEditMode) {
      this.httpService.updateMember(this.memberForm.value, this.memberForm.value.id);
    }
    else { //adding a new record
      this.memberForm.patchValue({ memberSince: new Date().toLocaleDateString() });
      this.memberForm.patchValue({ memberId: this.nextAvailableMemberNumber });
      this.httpService.addMember(this.memberForm.value);
    }
    this.httpService.refreshTable();
    this.close();
  }

  close() {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
