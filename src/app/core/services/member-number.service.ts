import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IClubMember } from 'src/app/shared/models/club-member.model';


@Injectable({
  providedIn: 'root'
})

export class MemberNumberService implements OnInit {

  public nextAvailableMemberNumber$ = new BehaviorSubject<number>(0);
  public idArray: Array<IClubMember> = [];
  private idNums: Array<number> = [];

  ngOnInit() {}

  // get the next unused id (member ID)
  findNextAvailableId() {
    let result = 0;
    this.idNums = this.idArray.map(records => {
      return records['memberId'];
    })

    result = Math.max.apply(Math,this.idNums)
    console.log('result', result);
    this.nextAvailableMemberNumber$.next(result + 1);

  }

}
