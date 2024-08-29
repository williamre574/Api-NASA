import { TestBed } from '@angular/core/testing';

import { ServiceNasaService } from './service-nasa.service';

describe('ServiceNasaService', () => {
  let service: ServiceNasaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceNasaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
