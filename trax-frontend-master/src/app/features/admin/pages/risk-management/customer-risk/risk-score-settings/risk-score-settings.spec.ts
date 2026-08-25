import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskScoreSettings } from './risk-score-settings';

describe('RiskScoreSettings', () => {
  let component: RiskScoreSettings;
  let fixture: ComponentFixture<RiskScoreSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskScoreSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(RiskScoreSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
