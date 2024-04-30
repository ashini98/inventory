import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import {Login} from "../models/login";

@Injectable({ providedIn: 'root' })
export class LoginService {
  private loginSubject: BehaviorSubject<Login>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.loginSubject = new BehaviorSubject<Login>(null);
  }

  public get loginValue(): Login {
    return this.loginSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`/authenticate`, { email, password },
      { withCredentials: true })
      .pipe(map(login => {
        this.loginSubject.next(login);
        return login;
      }));
  }

  refreshToken() {
    return this.http.post<any>(`/refresh-token`, {}, { withCredentials: true })
      .pipe(map((login) => {
        this.loginSubject.next(login);
        return login;
      }));
  }
}
