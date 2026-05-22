export interface TimeProgress{
    id: number;
    exposureHours: number;
    exposureType?: string;
    description?: string;
    created_at?: Date | null;
  }

export interface InsertTimeProgress {
    exposureHours: number;
    exposureType?: string | null;
    description?: string | null;
  }
  