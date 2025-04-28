import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MasterService } from '../../services/master.service';
import {
  Employee,
  IApiResponse,
  IChildDept,
  IParentDept,
} from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {

  // Injecting required services and router for navigation
  masterService = inject(MasterService);
  employeeService = inject(EmployeeService);
  router = inject(Router);

  // Signal to manage the state of the side panel (open/close)
  isSidePanelOpen = signal<boolean>(false);

  // Arrays to store department data and employee list
  parentDeptList: IParentDept[] = [];
  childDeptList: IChildDept[] = [];
  employeeList: Employee[] = [];

  // Variable to hold the department id when selecting a department
  deptId: number = 0;

  // Object to hold employee data, used for add/edit actions
  employeeObj: Employee = new Employee();

  // Lifecycle hook that runs when the component is initialized
  ngOnInit(): void {
    this.getParentDeptList(); // Fetch the list of parent departments
    this.getEmployees(); // Fetch the list of employees
  }

  // Method to open the side panel and navigate to the "Add New Employee" page
  addNew() {
    this.isSidePanelOpen.set(true); // Open the side panel
    this.router.navigate(['/new-employee']); // Navigate to the new employee page
  }

  // Method to close the side panel
  close() {
    this.isSidePanelOpen.set(false); // Close the side panel
  }

  // Method to fetch the list of employees from the backend service
  getEmployees() {
    this.employeeService.getEmployee().subscribe((res: Employee[]) => {
      this.employeeList = res; // Assign the fetched employee list to the employeeList array
    });
  }

  // Method to fetch the list of parent departments
  getParentDeptList() {
    this.masterService.getParentDept().subscribe((res: IApiResponse) => {
      this.parentDeptList = res.data; // Store the list of parent departments in parentDeptList
    });
  }

  // Method to fetch the list of child departments based on the selected parent department
  onDeptChange() {
    this.masterService
      .getChildDeptByParentId(this.deptId)
      .subscribe((res: IApiResponse) => {
        this.childDeptList = res.data; // Store the list of child departments based on deptId
      });
  }

  // Method to save a new employee (create a new employee record)
  onSaveEmp() {
    this.employeeService.createNewEmployee(this.employeeObj).subscribe(
      (res: Employee) => {
        alert('Employee Created Successfully'); // Show success message
        this.getEmployees(); // Refresh the employee list
      },
      (error) => {
        alert('Error Occurred while creating employee'); // Show error message in case of failure
      }
    );
  }

  // Method to update an existing employee record
  onUpdateEmp() {
    this.employeeService.updateEmployee(this.employeeObj).subscribe(
      (res: Employee) => {
        alert('Employee Updated Successfully'); // Show success message
        this.getEmployees(); // Refresh the employee list
      },
      (error) => {
        alert('Error Occurred while updating employee'); // Show error message in case of failure
      }
    );
  }

  // Method to open the employee data in edit mode for updating
  onEdit(obj: Employee) {
    this.employeeObj = obj; // Set the employee object to be edited
    this.router.navigate(['/edit-employee', obj.employeeId]); // Navigate to the edit employee page with employee ID
  }

  // Method to delete an employee record
  onDelete(id: number) {
    const result = confirm('Are you sure you want to delete this employee?'); // Show confirmation dialog before deleting
    if (result) {
      this.employeeService.deleteEmpById(id).subscribe(
        (res: Employee) => {
          alert('Employee Deleted Successfully'); // Show success message after deletion
          this.getEmployees(); // Refresh the employee list
        },
        (error) => {
          alert('Error Occurred while deleting employee'); // Show error message in case of failure
        }
      );
    }
  }
}
