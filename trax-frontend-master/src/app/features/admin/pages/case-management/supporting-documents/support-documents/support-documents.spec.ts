import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportDocuments } from './support-documents';

describe('SupportDocuments', () => {
  let component: SupportDocuments;
  let fixture: ComponentFixture<SupportDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportDocuments],
    }).compileComponents();

    fixture = TestBed.createComponent(SupportDocuments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
