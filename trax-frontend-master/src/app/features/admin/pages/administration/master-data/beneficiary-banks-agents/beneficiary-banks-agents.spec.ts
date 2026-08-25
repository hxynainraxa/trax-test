import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryBanksAgents } from './beneficiary-banks-agents';

describe('BeneficiaryBanksAgents', () => {
  let component: BeneficiaryBanksAgents;
  let fixture: ComponentFixture<BeneficiaryBanksAgents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeneficiaryBanksAgents],
    }).compileComponents();

    fixture = TestBed.createComponent(BeneficiaryBanksAgents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
