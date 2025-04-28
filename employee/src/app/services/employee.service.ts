import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, Project, projectEmployee } from '../model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) { }

apiUrl = 'https://projectapi.gerasim.in/api/EmployeeManagement/';

  createNewEmployee(obj:Employee){
   return this.http.post<Employee>(this.apiUrl+'CreateEmployee', obj);
  }

  updateEmployee(obj:Employee){
    return this.http.put<Employee>(this.apiUrl+'UpdateEmployee/'+obj.employeeId,obj);
  }

  getEmployee(){
    return this.http.get<Employee[]>(this.apiUrl+'GetAllEmployees');
  }

  deleteEmpById(id:number){
    return this.http.delete<Employee>(this.apiUrl+'DeleteEmployee/'+id);
  }

  // Method to get a single employee by ID
  getEmployeeById(employeeId: number) {
    return this.http.get<Employee>(`${this.apiUrl}GetEmployee/${employeeId}`);
  }

  createNewProject(obj:Project){
    return this.http.post<Project>(`${this.apiUrl}CreateProject`, obj);
   }
 
   getProjects(){
    return this.http.get<Project[]>(this.apiUrl+'GetAllProjects');
  }

  upadteProject(obj:Project){
    return this.http.put<Project>(this.apiUrl+'UpdateProject/'+obj.projectId,obj);
  }

  deleteProject(obj: Project) {
    return this.http.delete<Project>(this.apiUrl + 'DeleteProject/' + obj.projectId);
  }
  
  
  addNewProjectEmployee(obj:projectEmployee){
    return this.http.post<projectEmployee>(`${this.apiUrl}CreateProjectEmployee`, obj);
   }

  //  getProjectEmployee(id:number){
  //   return this.http.get<projectEmployee[]>(this.apiUrl+'GetProjectEmployee/'+id);
  // }

  
  getAllProjectEmployee(){
    return this.http.get<projectEmployee[]>(this.apiUrl+'GetAllProjectEmployees');
  }

}
