import { Injectable } from '@angular/core';
import { catchError } from "rxjs/operators";
import { HttpErrorResponse, HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class ZipcodeService {

  // mockData = [{
  //   "input_index": 0,
  //   "city_states": [{
  //     "city": "Providence",
  //     "state_abbreviation": "NC",
  //     "state": "North Carolina",
  //     "mailable_city": true
  //   }],
  //   "zipcodes": [{
  //     "zipcode": "27315",
  //     "zipcode_type": "S",
  //     "default_city": "Providence",
  //     "county_fips": "37033",
  //     "county_name": "Caswell",
  //     "state_abbreviation": "NC",
  //     "state": "North Carolina",
  //     "latitude": 36.51034,
  //     "longitude": -79.39197,
  //     "precision": "Zip5"
  //   }]
  // }];

  zipcodeInput: string = '27315';
  addressResponse: any;
  cityResponse: string = '';
  stateResponse: string = '';

  cityName: string = '';
  stateAbbreviation: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  getCityState(zipcodeInput) {
    const zip = "27315"
    const clientKey = "js-ncZvzEZ4Yh8fP16aRHveo5v6d5ysGoUR3F4ssAPf1MBUtqUfWY3EHLhbCQMMA0eZ"
    const url = "https://www.zipcodeapi.com/rest/" + clientKey + "/info.json/" + zip + "/radians";

    // console.log('url is', url);
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
