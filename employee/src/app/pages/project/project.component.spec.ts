import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { EmployeeService } from '../../services/employee.service';
import { MasterService } from '../../services/master.service';

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectComponent],
      providers: [MasterService, EmployeeService, HttpClient, HttpHandler],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
