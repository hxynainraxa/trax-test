import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRule } from './create-rule';

describe('CreateRule', () => {
  let component: CreateRule;
  let fixture: ComponentFixture<CreateRule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
