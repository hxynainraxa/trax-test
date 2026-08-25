import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatureOfBusinessRisk } from './nature-of-business-risk';

describe('NatureOfBusinessRisk', () => {
  let component: NatureOfBusinessRisk;
  let fixture: ComponentFixture<NatureOfBusinessRisk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NatureOfBusinessRisk],
    }).compileComponents();

    fixture = TestBed.createComponent(NatureOfBusinessRisk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
