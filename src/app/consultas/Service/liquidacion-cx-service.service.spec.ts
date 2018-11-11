import { TestBed } from '@angular/core/testing';

import { LiquidacionCxServiceService } from './liquidacion-cx-service.service';

describe('LiquidacionCxServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiquidacionCxServiceService = TestBed.get(LiquidacionCxServiceService);
    expect(service).toBeTruthy();
  });
});
