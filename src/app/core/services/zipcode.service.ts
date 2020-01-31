import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { HttpErrorResponse, HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class ZipcodeService {

  zipcodeInput: string = '';
  addressResponse: any;
  cityResponse: string = '';
  stateResponse: string = '';

  cityName: string = '';
  stateAbbreviation: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCityState(zipcodeInput) {
    const zip = ""
    const clientKey = "js-ncZvzEZ4Yh8fP16aRHveo5v6d5ysGoUR3F4ssAPf1MBUtqUfWY3EHLhbCQMMA0eZ"
    const url = "https://www.zipcodeapi.com/rest/" + clientKey + "/info.json/" + zip + "/radians";

    return this.httpClient
      .get(`${url}`)
      .pipe(catchError(this.handleError));

  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error("Error occurred: ", error.error.message);
    } else {
      console.error(
        `Server error ${error.status} ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
