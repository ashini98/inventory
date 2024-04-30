import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import {Register} from "../models/Register";

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private registerSubject: BehaviorSubject<Register>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.registerSubject = new BehaviorSubject<Register>(null);
  }

  public get registerValue(): Register {
    return this.registerSubject.value;
  }

  register(email: string, password: string) {
    return this.http.post<any>(`/authenticate`, { email, password },
      { withCredentials: true })
      .pipe(map(register => {
        this.registerSubject.next(register);
        return register;
      }));
  }

  refreshToken() {
    return this.http.post<any>(`/refresh-token`, {},
      { withCredentials: true })
      .pipe(map((register) => {
        this.registerSubject.next(register);
        return register;
      }));
  }
}
