import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsList } from './goods-list';

describe('GoodsList', () => {
  let component: GoodsList;
  let fixture: ComponentFixture<GoodsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoodsList],
    }).compileComponents();

    fixture = TestBed.createComponent(GoodsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
