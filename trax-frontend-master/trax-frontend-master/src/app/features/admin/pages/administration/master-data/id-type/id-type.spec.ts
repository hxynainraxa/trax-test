import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdType } from './id-type';

describe('IdType', () => {
  let component: IdType;
  let fixture: ComponentFixture<IdType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdType],
    }).compileComponents();

    fixture = TestBed.createComponent(IdType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
