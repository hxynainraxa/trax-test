import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorporateRiskRating } from './corporate-risk-rating';

describe('CorporateRiskRating', () => {
  let component: CorporateRiskRating;
  let fixture: ComponentFixture<CorporateRiskRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorporateRiskRating],
    }).compileComponents();

    fixture = TestBed.createComponent(CorporateRiskRating);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
