import { TestBed } from '@angular/core/testing';

import { FunAdminService } from './fun-admin.service';

describe('FunAdminService', () => {
  let service: FunAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
