import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeComponent } from './pages/employee/employee.component';
import { ProjectComponent } from './pages/project/project.component';
import { ProjectEmployeeComponent } from './pages/project-employee/project-employee.component';
import { SignupComponent } from './pages/signup/signup.component';
import { AuthGuard } from './gaurd/auth.guard';
import { NewEmployeeComponent } from './pages/new-employee/new-employee.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  {
    path: '',
    component: LayoutComponent,
     canActivateChild: [AuthGuard],
    children: [
       { path: 'dashboard', component: DashboardComponent },
      { path: 'employee', component: EmployeeComponent },
      { path: 'new-employee', component: NewEmployeeComponent },
      { path: 'edit-employee/:id', component: NewEmployeeComponent } ,// route for editing employee
      { path: 'projects', component: ProjectComponent },
      { path: 'employee-projects', component: ProjectEmployeeComponent },
      { path: 'employee-projects/:id', component: ProjectEmployeeComponent },
    
    ],
  },
];
