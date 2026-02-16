import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingZoneComponent } from './writing-zone.component';

describe('WritingZoneComponent', () => {
  let component: WritingZoneComponent;
  let fixture: ComponentFixture<WritingZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritingZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritingZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
