import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewEmployeeComponent } from './new-employee.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('NewEmployeeComponent', () => {
  let component: NewEmployeeComponent;
  let fixture: ComponentFixture<NewEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewEmployeeComponent],

      providers: [
        HttpClient, HttpHandler,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') return '1'; // Mock route param value
                  return null;
                }
              }
            }
          }
        }
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(NewEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
