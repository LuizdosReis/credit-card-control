import { TestBed } from '@angular/core/testing';

import { RepresentedCustomAdapterService } from './represented-custom-adapter';

describe('RepresentedCustomAdapterService', () => {
  let service: RepresentedCustomAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RepresentedCustomAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
