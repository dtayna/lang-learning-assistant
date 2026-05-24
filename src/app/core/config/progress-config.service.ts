import { Injectable } from '@angular/core'
import { LEVELS_METRICS, CEFRLevel } from '../config/progress-config'

@Injectable({ providedIn: 'root' })
export class ProgressConfigService {
  getLevelFromVocabulary(words: number): CEFRLevel {
    const levels = Object.values(LEVELS_METRICS)

    for (let i = levels.length - 1; i >= 0; i--) {
      if (words >= levels[i].vocabularySize) {
        return levels[i].level
      }
    }

    return 'A1'
  }

  getLevelFromExposureHours(hours: number): CEFRLevel {
    const levels = Object.values(LEVELS_METRICS)

    for (let i = levels.length - 1; i >= 0; i--) {
      if (hours >= levels[i].exposureHours) {
        return levels[i].level
      }
    }

    return 'A1'
  }

  progressToNextLevel(words: number): number {
    const levels = Object.values(LEVELS_METRICS)

    for (let i = 0; i < levels.length; i++) {
      if (words < levels[i].vocabularySize) {
        const prev = levels[i - 1]?.vocabularySize ?? 0
        const current = levels[i].vocabularySize
        return (words - prev) / (current - prev)
      }
    }

    return 1
  }
}
