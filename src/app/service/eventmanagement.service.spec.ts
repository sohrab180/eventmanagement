import { TestBed } from '@angular/core/testing';

import { EventmanagementService } from './eventmanagement.service';

describe('EventmanagementService', () => {
  let service: EventmanagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventmanagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
