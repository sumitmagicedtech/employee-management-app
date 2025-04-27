import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Employee, Project, projectEmployee } from '../../model/Employee';
import { EmployeeService } from '../../services/employee.service';
@Component({
  selector: 'app-project',
  imports: [CommonModule,FormsModule, ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {
constructor(private employeeSrv: EmployeeService) {
  this.initializeForms();
  this.employeeData$ = this.employeeSrv.getEmployee();
  
 }

 @ViewChild('myModal') employeeModel: ElementRef | undefined;

 closeModal() {
  if (this.employeeModel) {
    this.employeeModel.nativeElement.style.display = 'none';
  }
}

onAddEmployee(id: number) {
  this.getAllProjectEmployees(id);
  this.projectEmployee.projectId = id;
  const modalElement = this.employeeModel?.nativeElement;
  if (modalElement) {
    modalElement.style.display = 'block';
  }
}



 ngOnInit(): void {
   this.getAllProject();
 }

  currentView: string = 'List';
projectList: Project[] = [];
projectEmployeeList: projectEmployee[] = [];

projectForm: FormGroup = new FormGroup({});

employeeData$: Observable<Employee[]> = new Observable<Employee[]>();


projectEmployee: projectEmployee = new projectEmployee();

// onAddEmployee(id: number){
//   if(this.employeeModel){
//     this.employeeModel?.nativeElement.style.display = 'block';
//   }
// }

// closeModal(id: number){
//   if(this.employeeModel){
//     this.employeeModel?.nativeElement.style.display = 'none';
//   }
// }

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
    this.employeeSrv.upateProject(formsValue).subscribe({
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


// onSaveProject(){
//   const formsValue = this.projectForm.value;
// if(formsValue.projectId == 0){
// this.employeeSrv.createNewProject(formsValue).subscribe((res: Project) => {
// alert('Project Created Successfully');
// this.getAllProject();
// },error=>{
//   console.log('Error:', error);

// })
// }else{
//   this.employeeSrv.upateProject(formsValue).subscribe((res: Project) => {
//     alert('Project Updated Successfully');
//     this.getAllProject();

//   },error=>{
//     console.log('Error:', error);

//   })
// }  

// }


getAllProject(){
  this.employeeSrv.getProjects().subscribe((res: Project[]) => {
    this.projectList = res;
  }, error => {
    console.log('Error:', error);
  })
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



onAddEmp(){
  this.employeeSrv.addNewProjectEmployee(this.projectEmployee).subscribe((res: projectEmployee) => {
      alert('Employee Added to project Successfully');
   this.getAllProjectEmployees(this.projectEmployee.projectId);
    },error => {
      
  });
}


getAllProjectEmployees(id: number) {
  this.employeeSrv.getAllProjectEmployee().subscribe((res: projectEmployee[]) => {
   const record = res.filter((m) => m.projectId == id);
    this.projectEmployeeList = record;
  }, error => {
    console.log('Error:', error);
  })
}


  
}


