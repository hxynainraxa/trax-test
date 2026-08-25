import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemitterTypeRiskScore } from './remitter-type-risk-score';

describe('RemitterTypeRiskScore', () => {
  let component: RemitterTypeRiskScore;
  let fixture: ComponentFixture<RemitterTypeRiskScore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemitterTypeRiskScore],
    }).compileComponents();

    fixture = TestBed.createComponent(RemitterTypeRiskScore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
