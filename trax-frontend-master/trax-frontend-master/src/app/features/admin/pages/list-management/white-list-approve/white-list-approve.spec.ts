import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteListApprove } from './white-list-approve';

describe('WhiteListApprove', () => {
  let component: WhiteListApprove;
  let fixture: ComponentFixture<WhiteListApprove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiteListApprove],
    }).compileComponents();

    fixture = TestBed.createComponent(WhiteListApprove);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
