import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { LoginResponse } from '../models/LoginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl;
  loginUrl = 'v1/login';
  storageKey = 'access-token';

  constructor(private http: HttpClient, private router: Router) {}

  login(userData: { email: string; password: string }) {
    return this.http
      .post<LoginResponse>(`${this.baseUrl}/${this.loginUrl}`, userData)
      .pipe(
        tap((response: LoginResponse) => {
          this.setToken(response.data.token);
        })
      );
  }

  setToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.removeItem(this.storageKey);
    this.router.navigate(['/login']);
  }
}
