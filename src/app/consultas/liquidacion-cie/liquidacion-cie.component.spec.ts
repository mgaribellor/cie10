import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionCIEComponent } from './liquidacion-cie.component';

describe('LiquidacionCIEComponent', () => {
  let component: LiquidacionCIEComponent;
  let fixture: ComponentFixture<LiquidacionCIEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidacionCIEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionCIEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
