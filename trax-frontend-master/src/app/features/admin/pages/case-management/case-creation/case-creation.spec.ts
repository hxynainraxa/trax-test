import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseCreation } from './case-creation';

describe('CaseCreation', () => {
  let component: CaseCreation;
  let fixture: ComponentFixture<CaseCreation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseCreation],
    }).compileComponents();

    fixture = TestBed.createComponent(CaseCreation);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
