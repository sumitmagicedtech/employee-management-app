import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  name = '';
  email = '';
  password = '';
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService.signup(this.name, this.email, this.password).subscribe((success) => {
      if (success) {
        this.message = 'Signup successful! Redirecting to homepage...';
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to homepage after successful signup
        }, 2000); // Wait 2 seconds before redirecting
      } else {
        this.message = 'Signup failed. Please try again.';
      }
    });
  }
}
