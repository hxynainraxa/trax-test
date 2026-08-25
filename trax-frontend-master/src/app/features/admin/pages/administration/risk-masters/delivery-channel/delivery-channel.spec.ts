import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChannel } from './delivery-channel';

describe('DeliveryChannel', () => {
  let component: DeliveryChannel;
  let fixture: ComponentFixture<DeliveryChannel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryChannel],
    }).compileComponents();

    fixture = TestBed.createComponent(DeliveryChannel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
