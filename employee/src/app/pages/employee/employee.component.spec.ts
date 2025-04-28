import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeComponent } from './employee.component';
import { MasterService } from '../../services/master.service';
import { EmployeeService } from '../../services/employee.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('EmployeeComponent', () => {
  let component: EmployeeComponent;
  let fixture: ComponentFixture<EmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [EmployeeComponent],
      providers: [MasterService, EmployeeService, HttpClient, HttpHandler],

    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(EmployeeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
