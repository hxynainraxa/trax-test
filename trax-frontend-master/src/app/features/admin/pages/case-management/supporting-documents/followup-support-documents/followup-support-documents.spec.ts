import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowupSupportDocuments } from './followup-support-documents';

describe('FollowupSupportDocuments', () => {
  let component: FollowupSupportDocuments;
  let fixture: ComponentFixture<FollowupSupportDocuments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FollowupSupportDocuments],
    }).compileComponents();

    fixture = TestBed.createComponent(FollowupSupportDocuments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
