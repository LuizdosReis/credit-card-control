import { TestBed } from '@angular/core/testing';

import { LoaderInterceptorServiceService } from './loader-interceptor-service.service';

describe('LoaderInterceptorServiceService', () => {
  let service: LoaderInterceptorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderInterceptorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
