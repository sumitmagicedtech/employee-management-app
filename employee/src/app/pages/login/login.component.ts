import { CommonModule } from '@angular/common'; // Importing CommonModule for common Angular directives like ngIf and ngFor
import { Component } from '@angular/core'; // Importing Component and inject for dependency injection
import { FormsModule } from '@angular/forms'; // Importing FormsModule to enable form-related functionality
import { Router, RouterLink } from '@angular/router'; // Importing Router and RouterLink for navigation
import { AuthService } from '../../services/auth.service'; // Importing AuthService to handle authentication

@Component({
  selector: 'app-login', // The selector for the component (used in HTML)
  imports: [CommonModule, FormsModule, RouterLink], // Importing required modules for this component
  standalone: true, // This is a standalone component, meaning it doesn't depend on any module
  templateUrl: './login.component.html', // The HTML template for this component
  styleUrl: './login.component.css' // The CSS styles for this component
})
export class LoginComponent {
  email = ''; // Variable to store the user's email input
  password = ''; // Variable to store the user's password input
  error = ''; // Variable to store error messages if the login fails

  // Constructor with dependency injection of AuthService and Router
  constructor(private authService: AuthService, private router: Router) {}

  // ngOnInit lifecycle hook to initialize component variables
  ngOnInit() {
    this.password = ''; // Ensuring password field is empty when the component is initialized
  }

  // Method to handle login logic
  login() {
    // Calling the login method from AuthService, passing email and password
    this.authService.login(this.email, this.password).subscribe((success) => {
      // If login is successful, navigate to the dashboard
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        // If login fails, show an error message and clear the password for security reasons
        this.error = 'Invalid email or password.';
        this.password = ''; // Clear password for security
      }
    });
  }
  
  // You can add other methods here if needed (for example, for handling form validation or error handling)
}
