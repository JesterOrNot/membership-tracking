import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IClubMember } from 'src/app/shared/models/club-member.model';
import { HttpService } from './http.service';

// Calculates the next available member ID number by
// taking the array of all members, extracting the member ID
// numbers and then getting the maximum number and
// incrementing it by one
const FIRST_MEMBER_NUMBER: number = 100;

@Injectable({
  providedIn: 'root'
})
export class MemberNumberService {

  // hold the next available number for use by the add new member component
  public nextAvailableMemberNumber$ = new BehaviorSubject<number>(0);
  //the array of all members passed in my the getMembers http function
  public memberArray = new BehaviorSubject<any[]>([]);
  // the member numbers extracted from all member records
  private idNumbersArray: any[];

  constructor() {}

  // get the next unused id (member ID)
  findNextAvailableId() {

    if (this.memberArray.value.length > 0) {

      this.idNumbersArray = this.memberArray.value.map(record => record.memberId);
      let highestNumberUsed = Math.max.apply(Math, this.idNumbersArray)
      this.nextAvailableMemberNumber$.next(highestNumberUsed + 1);
    }
    else {
      // no members on record so start with the first number
      this.nextAvailableMemberNumber$.next(FIRST_MEMBER_NUMBER);
    }
  }
}
