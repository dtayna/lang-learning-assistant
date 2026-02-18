export interface Hour{
    id: number;
    exposureHours: number;
    exposureType?: string;
    description?: string;
    created_at?: Date | null;
  }

export interface InsertHour {
    exposureHours: number;
    exposureType?: string | null;
    description?: string | null;
  }
  