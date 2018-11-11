import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionCxComponent } from './liquidacion-cx.component';

describe('LiquidacionCxComponent', () => {
  let component: LiquidacionCxComponent;
  let fixture: ComponentFixture<LiquidacionCxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiquidacionCxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiquidacionCxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
