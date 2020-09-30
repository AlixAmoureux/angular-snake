import { TestBed } from '@angular/core/testing';

import { GetMainInfoService } from './get-main-info.service';

describe('GetMainInfoService', () => {
  let service: GetMainInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetMainInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
