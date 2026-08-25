import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OccupationRisk } from './occupation-risk';

describe('OccupationRisk', () => {
  let component: OccupationRisk;
  let fixture: ComponentFixture<OccupationRisk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccupationRisk],
    }).compileComponents();

    fixture = TestBed.createComponent(OccupationRisk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
