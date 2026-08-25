import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountBlocked } from './account-blocked';

describe('AccountBlocked', () => {
  let component: AccountBlocked;
  let fixture: ComponentFixture<AccountBlocked>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountBlocked],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountBlocked);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
