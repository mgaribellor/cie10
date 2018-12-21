import { TestBed } from '@angular/core/testing';

import { LiquidacionCIEService } from './liquidacion-cie.service';

describe('LiquidacionCIEService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiquidacionCIEService = TestBed.get(LiquidacionCIEService);
    expect(service).toBeTruthy();
  });
});
