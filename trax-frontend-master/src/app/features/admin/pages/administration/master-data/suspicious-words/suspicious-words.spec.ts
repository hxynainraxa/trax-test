import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspiciousWords } from './suspicious-words';

describe('SuspiciousWords', () => {
  let component: SuspiciousWords;
  let fixture: ComponentFixture<SuspiciousWords>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspiciousWords],
    }).compileComponents();

    fixture = TestBed.createComponent(SuspiciousWords);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
