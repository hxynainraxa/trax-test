import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemittancePurpose } from './remittance-purpose';

describe('RemittancePurpose', () => {
  let component: RemittancePurpose;
  let fixture: ComponentFixture<RemittancePurpose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemittancePurpose],
    }).compileComponents();

    fixture = TestBed.createComponent(RemittancePurpose);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
