import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerRiskVerification } from './customer-risk-verification';

describe('CustomerRiskVerification', () => {
  let component: CustomerRiskVerification;
  let fixture: ComponentFixture<CustomerRiskVerification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerRiskVerification],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerRiskVerification);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
