import { TestBed } from '@angular/core/testing';

import { ResponsInterseptorService } from './respons-interseptor.service';

describe('ResponsInterseptorService', () => {
  let service: ResponsInterseptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsInterseptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
