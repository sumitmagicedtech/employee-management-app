
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Employee, IApiResponse, IChildDept, IParentDept } from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);
  router = inject(Router);

isSidePanelOpen = signal<boolean>(false);

  parentDeptList: IParentDept[] = [];
 childDeptList: IChildDept[] = [];
 employeeList: Employee[] = [];
 deptId: number = 0;

employeeObj: Employee = new Employee();

ngOnInit(): void {
  this.getParentDeptList();
  this.getEmployees();
}

addNew(){
  this.isSidePanelOpen.set(true);
  this.router.navigate(['/new-employee']);
}

close(){
  this.isSidePanelOpen.set(false);
}

getEmployees() {
this.employeeService.getEmployee().subscribe((res: Employee[]) => {
  this.employeeList = res;
});
}

getParentDeptList() {
  this.masterService.getParentDept().subscribe((res:IApiResponse) => {
 this.parentDeptList = res.data;
  });
}


onDeptChange(){
  this.masterService.getChildDeptByParentId(this.deptId).subscribe((res:IApiResponse) => {
    this.childDeptList = res.data;
  });
}


onSaveEmp(){
  this.employeeService.createNewEmployee(this.employeeObj).subscribe((res:Employee) => {
    alert('Employee Created Successfully');
    this.getEmployees();
  },error=>{
    alert('Error Occured while creating employee');
});
}

onUpdateEmp(){
  this.employeeService.upateEmployee(this.employeeObj).subscribe((res:Employee) => {
    alert('Employee Update Successfully');
    this.getEmployees();
  },error=>{
    alert('Error Occured while update employee');
});
}

onEdit(obj: Employee) {
  this.employeeObj = obj;
  this.router.navigate(['/edit-employee', obj.employeeId]);

}

onDelete(id: number){
  const result = confirm('Are you sure you want to delete this employee?');
  if(result){

    this.employeeService.deleteEmpById(id).subscribe((res:Employee) => {
      alert('Employee Deleted Successfully');
   this.getEmployees();
    },error=>{
      alert('Error Occured while Delete employee');
  });

  }
  
}





}
