import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionType } from './transaction-type';

describe('TransactionType', () => {
  let component: TransactionType;
  let fixture: ComponentFixture<TransactionType>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionType],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionType);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
