import { TestBed } from '@angular/core/testing';

import { Galery.ServiceService } from './galery.service.service';

describe('Galery.ServiceService', () => {
  let service: Galery.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Galery.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
