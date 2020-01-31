import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public username: string;
  public password: string;

  constructor(
    private router: Router,
    public loginService: LoginService
  ) { }

  onSubmit(form: NgForm) {
    this.loginService.loginName.next(form.value.username);
    this.router.navigate(['/members']);
  }
}
