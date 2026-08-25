import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoiseMaster } from './noise-master';

describe('NoiseMaster', () => {
  let component: NoiseMaster;
  let fixture: ComponentFixture<NoiseMaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoiseMaster],
    }).compileComponents();

    fixture = TestBed.createComponent(NoiseMaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
