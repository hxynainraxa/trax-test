import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalatedAlerts } from './escalated-alerts';

describe('EscalatedAlerts', () => {
  let component: EscalatedAlerts;
  let fixture: ComponentFixture<EscalatedAlerts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscalatedAlerts],
    }).compileComponents();

    fixture = TestBed.createComponent(EscalatedAlerts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
