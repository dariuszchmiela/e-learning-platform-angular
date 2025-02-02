import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/user';
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.apiUrl, user);
  }
}
