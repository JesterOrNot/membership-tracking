// Using this to populate the
// activities select box as json-server doesn't
// easily support multiple databases.
// It can be setup to run two server instances but
// that's a lot of work just to provide a static list
// of select options. Maybe I'll do that later and provide
// a list maintenance capability

import { Injectable } from '@angular/core'

export interface IActivity {
  value: string,
  desc: string
}

@Injectable({
  providedIn: 'root'
})

export class ActivityListService {

  activities: IActivity[] = [
    { value: "None", desc: "None" },
    { value: "Weightlifting", desc: "Weightlifting" },
    { value: "Tennis", desc: "Tennis" },
    { value: "Jogging", desc: "Jogging" },
    { value: "Treadmill", desc: "Treadmill" },
    { value: "Pilates", desc: "Pilates" },
    { value: "Aerobics", desc: "Aerobics" },
    { value: "Swimming", desc: "Swimming" },
    { value: "Rowing", desc: "Rowing" },
    { value: "Cycling", desc: "Cycling" }
  ];

  getActivities(): IActivity[] {
    return this.activities;
  }
}