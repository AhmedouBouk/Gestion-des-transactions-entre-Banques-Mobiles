// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    /*
    this.authService.login(this.username, this.password).subscribe(response => {
      if (response.success) {
        this.router.navigate(['/transaction']);
      } else {
        alert('Login failed');
      }
    }, error => {
      console.error('Login failed', error);
    }); */
    this.router.navigate(['/transaction']);
  }
}
