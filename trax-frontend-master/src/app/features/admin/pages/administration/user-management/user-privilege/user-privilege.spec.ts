import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPrivilege } from './user-privilege';

describe('UserPrivilege', () => {
  let component: UserPrivilege;
  let fixture: ComponentFixture<UserPrivilege>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPrivilege],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPrivilege);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
