import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceOfIncome } from './source-of-income';

describe('SourceOfIncome', () => {
  let component: SourceOfIncome;
  let fixture: ComponentFixture<SourceOfIncome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceOfIncome],
    }).compileComponents();

    fixture = TestBed.createComponent(SourceOfIncome);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
