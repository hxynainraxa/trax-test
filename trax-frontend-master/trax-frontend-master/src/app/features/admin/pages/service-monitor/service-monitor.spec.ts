import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceMonitor } from './service-monitor';

describe('ServiceMonitor', () => {
  let component: ServiceMonitor;
  let fixture: ComponentFixture<ServiceMonitor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceMonitor],
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceMonitor);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
