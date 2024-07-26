import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  toggleSignUpMode(): void {
    this.isSignUpMode = !this.isSignUpMode;
  }

  onLogin(): void {
    // For now, just navigate to the transaction form page
    this.router.navigate(['/transaction']);
  }

  onSignup(): void {
    // For now, just navigate to the transaction form page
    this.router.navigate(['/transaction']);
  }
}
