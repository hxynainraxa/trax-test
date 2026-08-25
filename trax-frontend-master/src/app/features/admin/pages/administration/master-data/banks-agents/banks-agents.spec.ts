import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksAgents } from './banks-agents';

describe('BanksAgents', () => {
  let component: BanksAgents;
  let fixture: ComponentFixture<BanksAgents>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanksAgents],
    }).compileComponents();

    fixture = TestBed.createComponent(BanksAgents);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
