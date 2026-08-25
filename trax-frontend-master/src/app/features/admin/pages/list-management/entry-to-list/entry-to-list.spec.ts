import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryToList } from './entry-to-list';

describe('EntryToList', () => {
  let component: EntryToList;
  let fixture: ComponentFixture<EntryToList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntryToList],
    }).compileComponents();

    fixture = TestBed.createComponent(EntryToList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
