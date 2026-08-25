import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Authenticator } from './authenticator';

describe('Authenticator', () => {
  let component: Authenticator;
  let fixture: ComponentFixture<Authenticator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Authenticator],
    }).compileComponents();

    fixture = TestBed.createComponent(Authenticator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
