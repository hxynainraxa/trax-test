import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClearViolation } from './clear-violation';

describe('ClearViolation', () => {
  let component: ClearViolation;
  let fixture: ComponentFixture<ClearViolation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClearViolation],
    }).compileComponents();

    fixture = TestBed.createComponent(ClearViolation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
