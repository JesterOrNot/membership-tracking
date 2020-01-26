import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IClubMember } from 'src/app/shared/models/club-member.model';


@Injectable({
  providedIn: 'root'
})

export class MemberNumberService implements OnInit {

  public nextAvailableMemberNumber$ = new BehaviorSubject<number>(100);
  public idArray: Array<IClubMember> = [];
  private idNums: any;

  ngOnInit() { }

  // get the next unused id (member ID)
  findNextAvailableId() {
    console.log('source idArray', this.idArray);
    let result = 0;
    this.idNums = [...new Set(this.idArray.map(record => {
      record.memberId;
      console.log('record', (record));
    }))];
    this.idNums = this.idArray.map(records => {
      console.log('id array', this.idArray);
      return records['memberId'];
    })

    console.log('id number array', this.idNums);
    result = Math.max.apply(Math, this.idNums)
    console.log('result from member number service', result);
    this.nextAvailableMemberNumber$.next(result + 1);
  }

}
