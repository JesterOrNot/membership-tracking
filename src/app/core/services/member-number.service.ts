import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IClubMember } from 'src/app/shared/models/club-member.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})

// Calculates the next available member ID number by
// taking the array of all members, extracting the member ID
// numbers and then getting the maximum number and
// incrementing it by one

export class MemberNumberService {

  // hold the next available number for use by the add new member component
  public nextAvailableMemberNumber$ = new BehaviorSubject<number>(0);
  //the array of all members passed in my the getMembers http function
  public memberArray = new BehaviorSubject<any[]>([]);

  //the local array of all member records copied from the memberArray Subject
  private memberArrayLocal: Array<any> = [];
  // the member numbers extracted from all member records
  private idNumbersArray: any[];

  //don't think this is needed, this class doesn't a reference to the next number
  // private nextMemberNumber: number;

  constructor() {
    this.memberArray.subscribe(memberList => {
      this.memberArrayLocal = memberList;
    });
  }

  // get the next unused id (member ID)
  findNextAvailableId() {
    console.log('array length', this.memberArray.value.length);
    if (this.memberArray.value.length > 0) {
      console.log('member array', this.memberArray.value);
      this.memberArrayLocal = this.memberArray.value;
      console.log('new memberArrayLocal', this.memberArrayLocal);

      this.idNumbersArray = this.memberArrayLocal.map(record => record.memberId);
      console.log('id numbers', this.idNumbersArray);

      let result = Math.max.apply(Math, this.idNumbersArray)
      console.log('math result is', result);

      this.nextAvailableMemberNumber$.next(result + 1);
    }
    else {
      console.log('setting next number to 100');
      this.nextAvailableMemberNumber$.next(100);
    }

  }
}
