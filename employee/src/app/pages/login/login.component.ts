import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
// loginObj : any = {
//   "userName": "",
//   "password": ""
// }

// http = inject(HttpClient);
// router = inject(Router);


// onLogin() {
//   this.http.post('https://projectapi.gerasim.in/api/EmployeeManagement/login', this.loginObj).subscribe((res: any) => {
//     localStorage.setItem('employeeApp', JSON.stringify(res.data));
// if(res.result){
// this.router.navigateByUrl('/dashboard');
// }else{
//   alert(res.message);
//   }
// })

// }

// }

ngOnInit() {
  this.password = '';
}

email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  // login() {
  //   this.authService.login(this.email, this.password).subscribe((success) => {
  //     if (success) {
  //       this.router.navigate(['/dashboard']); // Redirect to homepage
  //     } else {
  //       this.error = 'Invalid credentials, please try again.';
  //     }
  //   });
  // }
  
  login() {
    this.authService.login(this.email, this.password).subscribe((success) => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.error = 'Invalid email or password.';
        this.password = ''; // Clear password for security
      }
    });
  }
  
}

