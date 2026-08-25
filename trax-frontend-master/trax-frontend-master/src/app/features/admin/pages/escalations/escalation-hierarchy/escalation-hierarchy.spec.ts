import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscalationHierarchy } from './escalation-hierarchy';

describe('EscalationHierarchy', () => {
  let component: EscalationHierarchy;
  let fixture: ComponentFixture<EscalationHierarchy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscalationHierarchy],
    }).compileComponents();

    fixture = TestBed.createComponent(EscalationHierarchy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
