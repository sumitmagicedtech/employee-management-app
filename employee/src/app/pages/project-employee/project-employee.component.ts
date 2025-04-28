import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee, Project, projectEmployee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project-employee',
  imports: [CommonModule, FormsModule, ReactiveFormsModule], 
   templateUrl: './project-employee.component.html',
  styleUrl: './project-employee.component.css'
})
export class ProjectEmployeeComponent implements OnInit {
  constructor(
    private employeeSrv: EmployeeService,
    private route: ActivatedRoute,
    private router : Router 

  ) {
    this.initializeForms();
    this.employeeData$ = this.employeeSrv.getEmployee();
  }
  projectId: number = 0;
  currentView: string = 'List';
  projectList: Project[] = [];
  projectEmployeeList: projectEmployee[] = [];
  projectForm: FormGroup = new FormGroup({});
  employeeData$: Observable<Employee[]> = new Observable<Employee[]>();
  projectEmployee: projectEmployee = new projectEmployee();

  ngOnInit(): void {
    this.getAllProject();
    // Get projectId from route params
    this.route.params.subscribe(params => {
      this.projectId = +params['projectId']; // Convert string to number
      this.getAllProjectEmployee(this.projectId);
    });
  }

 // Get employees for the current project
 getAllProjectEmployee(projectId: number) {
  this.employeeSrv.getAllProjectEmployee().subscribe((res: projectEmployee[]) => {
    const record = res.filter((m) => m.projectId === projectId);
    this.projectEmployeeList = record;
  }, error => {
    console.log('Error:', error);
  });
}


  initializeForms() {
    this.projectForm = new FormGroup({
      projectId: new FormControl(0),
      projectName: new FormControl(''),
      clientName: new FormControl(''),
      startDate: new FormControl(''),
      leadByEmpId: new FormControl(0),
      contactPerson: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl('')
    });
  }

  onEdit(projectData: Project) {
    this.currentView = 'Edit';
    this.projectForm.patchValue({
      projectId: projectData.projectId,
      projectName: projectData.projectName,
      clientName: projectData.clientName,
      startDate: projectData.startDate,
      leadByEmpId: projectData.leadByEmpId,
      contactPerson: projectData.contactPerson,
      contactNo: projectData.contactNo,
      emailId: projectData.emailId
    });
  }

  onSaveProject() {
    const formsValue = this.projectForm.value;

    if (formsValue.projectId == 0) {
      this.employeeSrv.createNewProject(formsValue).subscribe({
        next: (res: Project) => {
          alert('Project Created Successfully');
          this.getAllProject();
        },
        error: (error: any) => {
          console.log('Error:', error);
        }
      });
    } else {
      this.employeeSrv.upadteProject(formsValue).subscribe({
        next: (res: Project) => {
          alert('Project Updated Successfully');
          this.getAllProject();
        },
        error: (error: any) => {
          console.log('Error:', error);
        }
      });
    }
  }

  getAllProject() {
    this.employeeSrv.getProjects().subscribe((res: Project[]) => {
      this.projectList = res;
    }, error => {
      console.log('Error:', error);
    });
  }

  onDeleteProject(project: Project) {
    if (confirm(`Are you sure you want to delete project "${project.projectName}"?`)) {
      this.employeeSrv.deleteProject(project).subscribe({
        next: () => {
          alert('Project deleted successfully');
          this.getAllProject(); // refresh the list
        },
        error: (error) => {
          console.error('Error deleting project:', error);
        }
      });
    }
  }

  onAddEmp() {
    this.employeeSrv.addNewProjectEmployee(this.projectEmployee).subscribe((res: projectEmployee) => {
      alert('Employee Added to project Successfully');
      this.getAllProjectEmployees(this.projectEmployee.projectId);
    }, error => {
      console.log('Error:', error);
    });
  }

  getAllProjectEmployees(id: number) {
    this.employeeSrv.getAllProjectEmployee().subscribe((res: projectEmployee[]) => {
      const record = res.filter((m) => m.projectId == id);
      this.projectEmployeeList = record;
    }, error => {
      console.log('Error:', error);
    });
  }

  onClose(){
    this.router.navigate(['/projects']);
  }

}
