import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhiteList } from './white-list';

describe('WhiteList', () => {
  let component: WhiteList;
  let fixture: ComponentFixture<WhiteList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhiteList],
    }).compileComponents();

    fixture = TestBed.createComponent(WhiteList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
