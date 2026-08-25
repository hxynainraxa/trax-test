import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRiskRating } from './individual-risk-rating';

describe('IndividualRiskRating', () => {
  let component: IndividualRiskRating;
  let fixture: ComponentFixture<IndividualRiskRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualRiskRating],
    }).compileComponents();

    fixture = TestBed.createComponent(IndividualRiskRating);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
