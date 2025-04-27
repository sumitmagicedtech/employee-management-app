import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginObj : any = {
  "userName": "",
  "password": ""
}

http = inject(HttpClient);
router = inject(Router);


onLogin() {
  this.http.post('https://projectapi.gerasim.in/api/EmployeeManagement/login', this.loginObj).subscribe((res: any) => {
    localStorage.setItem('employeeApp', JSON.stringify(res.data));
if(res.result){
this.router.navigateByUrl('/dashboard');
}else{
  alert(res.message);
  }
})

}

}

