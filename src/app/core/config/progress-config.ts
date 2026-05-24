export type CEFRLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'

export interface LevelMetrics {
  level: CEFRLevel
  vocabularySize: number
  exposureHours: number
}

export const LEVELS_METRICS: Record<CEFRLevel, LevelMetrics> = {
  A1: { level: 'A1', vocabularySize: 500, exposureHours: 80 },
  A2: { level: 'A2', vocabularySize: 1000, exposureHours: 200 },
  B1: { level: 'B1', vocabularySize: 2000, exposureHours: 400 },
  B2: { level: 'B2', vocabularySize: 4000, exposureHours: 650 },
  C1: { level: 'C1', vocabularySize: 8000, exposureHours: 900 },
  C2: { level: 'C2', vocabularySize: 16000, exposureHours: 1200 },
}
