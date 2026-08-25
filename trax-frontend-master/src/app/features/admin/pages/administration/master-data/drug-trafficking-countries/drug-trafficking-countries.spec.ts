import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugTraffickingCountries } from './drug-trafficking-countries';

describe('DrugTraffickingCountries', () => {
  let component: DrugTraffickingCountries;
  let fixture: ComponentFixture<DrugTraffickingCountries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrugTraffickingCountries],
    }).compileComponents();

    fixture = TestBed.createComponent(DrugTraffickingCountries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
