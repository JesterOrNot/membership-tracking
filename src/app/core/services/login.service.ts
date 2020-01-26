import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  loginName: BehaviorSubject<string> = new BehaviorSubject<string>('');

}