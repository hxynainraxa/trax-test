import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySubTypeRisk } from './company-sub-type-risk';

describe('CompanySubTypeRisk', () => {
  let component: CompanySubTypeRisk;
  let fixture: ComponentFixture<CompanySubTypeRisk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanySubTypeRisk],
    }).compileComponents();

    fixture = TestBed.createComponent(CompanySubTypeRisk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
