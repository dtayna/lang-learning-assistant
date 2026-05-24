import { ComponentFixture, TestBed } from '@angular/core/testing'

import { VocabularyManagerComponent } from './vocabulary-manager.component'

describe('VocabularyManagerComponent', () => {
  let component: VocabularyManagerComponent
  let fixture: ComponentFixture<VocabularyManagerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyManagerComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(VocabularyManagerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
