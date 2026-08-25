import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeBranches } from './exchange-branches';

describe('ExchangeBranches', () => {
  let component: ExchangeBranches;
  let fixture: ComponentFixture<ExchangeBranches>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExchangeBranches],
    }).compileComponents();

    fixture = TestBed.createComponent(ExchangeBranches);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
