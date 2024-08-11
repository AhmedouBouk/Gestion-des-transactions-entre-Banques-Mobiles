import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { CommonModule } from '@angular/common';

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
  successMessage: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  toggleSignUpMode() {
    this.isSignUpMode = !this.isSignUpMode;
    this.resetForm();
  }

  onSignin() {
    this.authService.signIn(this.username, this.password).subscribe(response => {
      if (response.error) {
        this.errorMessage = response.error;
      }
    });
  }

  onSignup() {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return ;
    }
    this.authService.signUp(this.username, this.password).subscribe({
      next: (response) => {
        if (response.error) {
          this.errorMessage = response.error;
          console.log(response.error);
        } else {
          this.successMessage = 'Signup successful! now go and signin please';         
        }
      },
      error: (err) => {
        if (err.status === 400) {
            this.errorMessage = 'Username is already taken! Please choose another.';
            console.log(this.errorMessage); 
        }   
      }
    });
  }
  
  

  private resetForm() {
    this.username = '';
    this.password = '';
    this.confirmPassword = '';
    this.errorMessage = '';
  }
}
