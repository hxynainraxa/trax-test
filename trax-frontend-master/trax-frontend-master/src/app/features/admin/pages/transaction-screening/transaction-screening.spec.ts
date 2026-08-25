import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionScreening } from './transaction-screening';

describe('TransactionScreening', () => {
  let component: TransactionScreening;
  let fixture: ComponentFixture<TransactionScreening>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionScreening],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionScreening);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
