import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryToListApprove } from './entry-to-list-approve';

describe('EntryToListApprove', () => {
  let component: EntryToListApprove;
  let fixture: ComponentFixture<EntryToListApprove>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryToListApprove],
    }).compileComponents();

    fixture = TestBed.createComponent(EntryToListApprove);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
