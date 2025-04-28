import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { Employee, IApiResponse, IChildDept, IParentDept } from '../../model/Employee';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-employee',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './new-employee.component.html',
  styleUrl: './new-employee.component.css'
})
export class NewEmployeeComponent implements OnInit {


  employeeObj: Employee = new Employee();
  deptId: number = 0;
  parentDeptList: IParentDept[] = [];
  childDeptList: IChildDept[] = [];
  employeeList: Employee[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private masterService: MasterService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const employeeId = this.activatedRoute.snapshot.paramMap.get('id');

    if (employeeId) {
      this.getEmployeeById(parseInt(employeeId)); // Fetch the employee's data by ID
    }

    this.getParentDeptList();
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployee().subscribe((res: Employee[]) => {
      this.employeeList = res;
    });
    }

  getEmployeeById(employeeId: number) {
    this.employeeService.getEmployeeById(employeeId).subscribe((res: Employee) => {
      this.employeeObj = res;  // Set the employee data to the form
      this.deptId = res.deptId;  // Set department ID to fetch child departments
      this.getChildDeptList(res.deptId);  // Fetch the child departments
    });
  }

  getParentDeptList() {
    this.masterService.getParentDept().subscribe((res: IApiResponse) => {
      this.parentDeptList = res.data;
    });
  }

  getChildDeptList(deptId: number) {
    this.masterService.getChildDeptByParentId(deptId).subscribe((res: IApiResponse) => {
      this.childDeptList = res.data;
    });
  }

  onDeptChange() {
    this.getChildDeptList(this.deptId);
  }

  onUpdateEmp() {
    this.employeeService.updateEmployee(this.employeeObj).subscribe((res: Employee) => {
      alert('Employee Updated Successfully');
      this.router.navigate(['/employee']);  // Navigate back to the employee list
    }, error => {
      alert('Error Occurred while updating employee');
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

  close() {
    this.router.navigate(['/employee']);  // Close the form and navigate back to the employee list
  }
}