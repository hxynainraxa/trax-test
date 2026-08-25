import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRuleViolation } from './daily-rule-violation';

describe('DailyRuleViolation', () => {
  let component: DailyRuleViolation;
  let fixture: ComponentFixture<DailyRuleViolation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyRuleViolation],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyRuleViolation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
