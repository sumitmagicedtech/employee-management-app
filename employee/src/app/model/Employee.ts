export class Employee {
 employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role:string;
  createdDate: Date;

  constructor() {
   this.employeeId = 0;
   this.employeeName = '';
    this.contactNo = '';
    this.emailId = '';
    this.deptId = 0;
    this.password = '';
    this.gender = '';
    this.role = 'Employee'; 
    this.createdDate = new Date();


  }
}

export interface IParentDept{
  departmentId: number;
  departmentName: string;
  departmentLogo: string;
}


export interface IChildDept{
  childDeptId: number;
  parentDeptId: number;
  departmentName: string;
}

export interface IApiResponse{
  message: number;
  result: boolean;
  data: any;
}


export interface Project {
  projectId: number,
  projectName: string,
  clientName: string,
  startDate: string,
  leadByEmpId: number,
  contactPerson: string,
  contactNo: string,
  emailId: string,
  employeeName: string,
}


export class projectEmployee {
  empProjectId: number;
  projectId: number;
  empId: number;
  assignedDate: string;
  role: string;
  isActive: boolean;
  projectName?: string;
  employeeName?: string;

  constructor() {
    this.assignedDate = '';
    this.empProjectId = 0;  
    this.projectId = 0;
    this.empId = 0;
    this.role = '';
    this.isActive = true;

  }
}


