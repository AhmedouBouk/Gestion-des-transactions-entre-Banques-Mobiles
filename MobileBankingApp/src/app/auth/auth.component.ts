import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isSignUpMode: boolean = false;
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleSignUpMode() {
    this.isSignUpMode = !this.isSignUpMode;
    this.resetForm();
  }

  onSignin() {
    this.authService.signIn(this.username, this.password).pipe(
      tap(response => {
        console.log('Signin successful', response);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        console.error('Signin failed', error);
        this.errorMessage = 'Invalid username or password';
        return of(null); // Return an observable to complete the stream
      })
    ).subscribe();
  }

  onSignup() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }
    this.authService.signUp(this.username, this.password).subscribe(
      response => {
        console.log('Signup successful', response);
        this.router.navigate(['/transaction']);
      },
      error => {
        console.error('Signup failed', error);
        this.errorMessage = 'Signup failed. Please try again.';
      }
    );
  }

  private resetForm() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.errorMessage = '';
  }
}