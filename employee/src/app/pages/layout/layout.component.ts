import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './layout.component.html', // HTML template for the layout
  styleUrls: ['./layout.component.css']  // Styles for the layout component
})
export class LayoutComponent {
  // Injecting AuthService for authentication handling and Router for navigation
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Method to log out the user
   * It calls the logout method of AuthService and navigates to the login page
   */
  logout() {
    this.authService.logout(); // Logout the user
    this.router.navigate(['/login']); // Redirect to login page
  }
}
