import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    
    if (!refreshToken) {
      return of({ error: 'No refresh token found' });
    }
  
    return this.http.post<any>(`${this.apiUrl}/refresh-token`, { refreshToken }).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('refreshToken', response.refreshToken); // Update the refresh token if it's part of the response
        }
      }),
      catchError(error => {
        console.error('Refresh token failed:', error);
        return of({ error: 'Refresh token failed, please sign in again.' });
      })
    );
  }
  
  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  signIn(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, { username, password }).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('authToken', response.token);
          localStorage.setItem('username', response.username);
          this.router.navigate(['/transaction']);
          
        }
      }),
      catchError(error => {
        console.error('Signin failed:', error);
        return of({ error: 'Signin failed, please try again.' });
      })
    );
  }

  signUp(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signup`, { username, password }).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('authToken', response.token);
          console.log("Signup is successful");
        }
      }),
      map(response => {
        // Ensure the success message is passed to the component
        return { ...response, successMessage: 'Signup is successful!' };
      }),
      catchError(error => {
        console.error('Signup failed:', error);
        return of({ error: 'Signup failed, please try again.' });
      })
    );
  }
  
  
  

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      this.router.navigate(['/auth']);
    }
  }

  isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('authToken');
    }
    return false;
  }
}
