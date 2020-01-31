import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { IClubMember } from "../../shared/models/club-member.model";
import { BehaviorSubject, Observable, Subscription, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MemberNumberService } from './member-number.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': '5e2508ae4327326cf1c91944',
    'x-apikey': '5e2508ae4327326cf1c91944'
  })
};

@Injectable({
  providedIn: "root"
})
export class HttpService {

  restApi = "https://club-members-fbc.firebaseio.com/members";
  members: IClubMember[] = [];
  member: IClubMember;
  newRows$ = new BehaviorSubject<Array<any>>([]); // are we still using this?
  editMode = new BehaviorSubject<boolean>(null);
  isEditMode: boolean;

  constructor(
    private http: HttpClient,
    private router: Router,
    private memberNumberService: MemberNumberService
  ) { }

  // fetch all members
  getMembers() {
    return this.http
      .get<{ [key: string]: IClubMember[] }>(`${this.restApi}` + '.json')
      .pipe(
        map((responseData) => {
          if (responseData != null) {
            const membersArray: any[] = [];
            for (const key in responseData) {
              if (responseData.hasOwnProperty(key)) {
                membersArray.push({ ...responseData[key], id: key })
              }
            }
            this.newRows$.next([...membersArray]);
            this.memberNumberService.memberArray.next([...membersArray]);

            this.memberNumberService.findNextAvailableId();
            return membersArray;
          }
        })
      );
  }

  // get a specific member
  getMember(id: number) {
    return this.http
      .get<IClubMember>(`${this.restApi}/` + id + '.json')
      .pipe(
        // tap(data => console.log('from get', data)),
        catchError(this.handleError)
      );
  }

  // add a new member
  addMember(memberForm) {
    this.http.post(`${this.restApi}` + '.json', memberForm).subscribe(
      memberData => {
        this.refreshTable();
      },
      error => {
        console.error("Error on add", error);
      }
    );
  }

  // delete a specific member
  deleteMember(recordId) {
    this.http.delete(`${this.restApi}/` + recordId + '.json').subscribe(
      memberData => {
        this.refreshTable();
      },
      error => {
        console.error("Error on delete", error);
      }
    );
  }

  updateMember(memberForm, recordId) {
    this.http.put(`${this.restApi}/` + recordId + '.json', JSON.stringify(memberForm)).subscribe(
      data => { this.router.navigate(["members"]) },
      error => { console.log("Error", error) }
    )
  }

  // call this to update the table after adding, editing or deleting
  // as change detection doesn't fire when the database is changed
  refreshTable() {
    setTimeout(() => {
      this.getMembers()
        .subscribe(members => {
          this.newRows$.next(members);
        });
    }, 800);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("Error occurred: ", error.error.message);
    } else {
      console.error(
        `Server error ${error.status} ` + `body was:` + `${error.error}`
      );
      console.log('Error object', error);
    }
    return [];
  }
}
