import { TestBed } from '@angular/core/testing';

import { MasterService } from './master.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MasterService', () => {
  let service: MasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [ HttpClient, HttpHandler],

    });
    service = TestBed.inject(MasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
