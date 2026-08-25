import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreWeightageSettings } from './score-weightage-settings';

describe('ScoreWeightageSettings', () => {
  let component: ScoreWeightageSettings;
  let fixture: ComponentFixture<ScoreWeightageSettings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreWeightageSettings],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreWeightageSettings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
