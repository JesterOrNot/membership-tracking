import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { DialogService } from '../services/dialog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.css']
})
export class PageHeaderComponent {

  clubName = 'Club Member Tracking System';

  constructor(
    private httpService: HttpService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  addNewClick() {
    this.httpService.editMode.next(false);
    this.dialogService.openMemberDetailDialog();
    console.log('link clicked');
  }

  logoffClick() {
    this.router.navigate(['login']);
  }
}
