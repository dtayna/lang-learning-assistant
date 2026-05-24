import { Routes } from '@angular/router'
import { ProgressManagerComponent } from './features/progress-manager/progress-manager.component'

export const routes: Routes = [
  {
    path: '',
    component: ProgressManagerComponent,
  },
  {
    path: 'vocabulary',
    loadComponent: () =>
      import('./features/vocabulary-manager/vocabulary-manager.component').then(
        (m) => m.VocabularyManagerComponent,
      ),
  },
  {
    path: 'writing',
    loadComponent: () =>
      import('./features/writing-zone/writing-zone.component').then(
        (m) => m.WritingZoneComponent,
      ),
  },
]
