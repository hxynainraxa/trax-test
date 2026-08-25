import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbargoedCountries } from './embargoed-countries';

describe('EmbargoedCountries', () => {
  let component: EmbargoedCountries;
  let fixture: ComponentFixture<EmbargoedCountries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmbargoedCountries],
    }).compileComponents();

    fixture = TestBed.createComponent(EmbargoedCountries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
