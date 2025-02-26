import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Confession } from '../models/Confession.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfessionsService {
  baseUrl = environment.apiUrl;
  apiUrl = 'v1/confessions';

  constructor(private http: HttpClient) {}

  createConfession(confession: Confession): Observable<unknown> {
    return this.http.post(`${this.baseUrl}/${this.apiUrl}`, confession);
  }
}
