import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyTypeRisk } from './company-type-risk';

describe('CompanyTypeRisk', () => {
  let component: CompanyTypeRisk;
  let fixture: ComponentFixture<CompanyTypeRisk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyTypeRisk],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanyTypeRisk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
