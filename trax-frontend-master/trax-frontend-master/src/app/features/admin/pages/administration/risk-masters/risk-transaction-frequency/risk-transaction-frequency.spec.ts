import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskTransactionFrequency } from './risk-transaction-frequency';

describe('RiskTransactionFrequency', () => {
  let component: RiskTransactionFrequency;
  let fixture: ComponentFixture<RiskTransactionFrequency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskTransactionFrequency],
    }).compileComponents();

    fixture = TestBed.createComponent(RiskTransactionFrequency);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
