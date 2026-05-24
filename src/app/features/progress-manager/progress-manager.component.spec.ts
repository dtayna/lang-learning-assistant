import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ProgressManagerComponent } from './progress-manager.component'

describe('ProgressManagerComponent', () => {
  let component: ProgressManagerComponent
  let fixture: ComponentFixture<ProgressManagerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressManagerComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ProgressManagerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
