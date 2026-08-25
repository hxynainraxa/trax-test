import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByMembershipNumber } from './view-by-membership-number';

describe('ViewByMembershipNumber', () => {
  let component: ViewByMembershipNumber;
  let fixture: ComponentFixture<ViewByMembershipNumber>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewByMembershipNumber],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewByMembershipNumber);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
