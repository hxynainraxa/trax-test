import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeographicGroups } from './geographic-groups';

describe('GeographicGroups', () => {
  let component: GeographicGroups;
  let fixture: ComponentFixture<GeographicGroups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeographicGroups],
    }).compileComponents();

    fixture = TestBed.createComponent(GeographicGroups);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
