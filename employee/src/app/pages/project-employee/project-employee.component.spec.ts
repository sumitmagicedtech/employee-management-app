import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectEmployeeComponent } from './project-employee.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { EmployeeService } from '../../services/employee.service';
import { of } from 'rxjs';

describe('ProjectEmployeeComponent', () => {
  let component: ProjectEmployeeComponent;
  let fixture: ComponentFixture<ProjectEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectEmployeeComponent],
      providers: [
        EmployeeService,
        HttpClient,
        HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ projectId: 1 }) // <-- Correct mock for observable-based route params
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
