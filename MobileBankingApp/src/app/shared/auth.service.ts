import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  signIn(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signin`, { username, password }).pipe(
      tap(response => console.log('Signin response:', response))
    );
  }

  signUp(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, { username, password }).pipe(
      tap(response => console.log('Signup response:', response))
    );
  }
}
