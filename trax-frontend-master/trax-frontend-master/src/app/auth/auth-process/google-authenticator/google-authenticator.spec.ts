import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAuthenticator } from './google-authenticator';

describe('GoogleAuthenticator', () => {
  let component: GoogleAuthenticator;
  let fixture: ComponentFixture<GoogleAuthenticator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleAuthenticator],
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleAuthenticator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
