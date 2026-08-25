import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpAuthenticator } from './otp-authenticator';

describe('OtpAuthenticator', () => {
  let component: OtpAuthenticator;
  let fixture: ComponentFixture<OtpAuthenticator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpAuthenticator],
    }).compileComponents();

    fixture = TestBed.createComponent(OtpAuthenticator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
