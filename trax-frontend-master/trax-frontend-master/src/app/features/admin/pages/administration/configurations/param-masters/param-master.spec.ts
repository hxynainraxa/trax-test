import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamMasters } from './param-master';

describe('ParamMasters', () => {
  let component: ParamMasters;
  let fixture: ComponentFixture<ParamMasters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParamMasters],
    }).compileComponents();

    fixture = TestBed.createComponent(ParamMasters);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
