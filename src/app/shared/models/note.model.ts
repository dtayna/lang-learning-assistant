export interface Note {
  id: number
  title?: string
  text: string
  created_at?: Date | null
}

export interface InsertNote {
  title?: string | null
  text: string
}
