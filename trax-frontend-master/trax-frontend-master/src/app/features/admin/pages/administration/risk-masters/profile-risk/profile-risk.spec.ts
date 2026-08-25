import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRisk } from './profile-risk';

describe('ProfileRisk', () => {
  let component: ProfileRisk;
  let fixture: ComponentFixture<ProfileRisk>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRisk],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileRisk);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
