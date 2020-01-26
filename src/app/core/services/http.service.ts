import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { HttpErrorResponse, HttpClient, HttpHeaders } from "@angular/common/http";
import { IClubMember } from "../../shared/models/club-member.model";
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

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
  private subscriptions: Subscription[] = [];
  // restApi = "http://localhost:27017";
  restApi = "http://localhost:3000";
  // restApi = "https://3000-e415c16d-76d4-4a4c-997c-383f6cf9275b.ws-us02.gitpod.io:3000"
  // restApi = "https://members-929a.restdb.io/rest/club-members"
  // restdbKey = "?apikey=5e2508ae4327326cf1c91944"
  // restApi = "https://my-json-server.typicode.com/robbinsjk/club-members"
  members: IClubMember[] = [];
  member: IClubMember;
  // private corsApiKey = "5e2508ae4327326cf1c91944";

  newRows$ = new BehaviorSubject<Array<any>>([]);

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {   }

  // fetch all members
  getMembers(): Observable<IClubMember[]> {
    return this.http
      .get<IClubMember[]>(`${this.restApi}/members`)
      .pipe(
        tap(data => console.log('running getMembers', data)),
        // console.log('url is', );
        catchError(this.handleError)
      );
  }

  // get a specific member
  getMember(id: number) {
    return this.http
      .get<IClubMember>(`${this.restApi}/members/` + id)
      .pipe(
        // tap(data => console.log('from get', data)),
        catchError(this.handleError)
      );
  }

  // add a new member
  addMember(memberForm) {
    this.subscriptions.push(
      this.http.post(`${this.restApi}/members`, memberForm).subscribe(
        memberData => {
        },
        error => {
          console.error("Error on add", error);
        }
      ));
  }

  // delete a specific member
  deleteMember(row) {
    this.subscriptions.push(
      this.http.delete(`${this.restApi}/members/` + row).subscribe(
        memberData => {
          // console.log("Delete successful");
        },
        error => {
          console.error("Error on delete", error);
        }
      ));
  }

  updateMember(memberForm, id) {
    console.log('updating with ', memberForm);
    this.subscriptions.push(
      this.http.put(`${this.restApi}/members/` + id, memberForm).subscribe(
        data => { this.router.navigate(["members"]) },
        error => { console.log("Error", error) }
      ))
  }

  // call this to update the table after adding, editing or deleting
  // as change detection doesn't fire when the db.json is changed
  refreshTable() {
    setTimeout(() => {
      this.subscriptions.push(
        this.getMembers()
          .subscribe(members => {
            this.newRows$.next(members);
          }))
    }, 800);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("Error occurred: ", error.error.message);
    } else {
      console.error(
        `Server error ${error.status} ` + `body was:`+ `${error.error}`
      );
      console.log('Error object', error);
    }
    return [];
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
