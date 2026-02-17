export interface Word {
    id?: string;
    word: string;
    translation?: string;
    meaning?: string;
    examples?: string;
    image?: string;
    createdAt?: string;
  }
  

  export interface InsertWord {
    word: string;
    translation?: string | null;
    meaning?: string | null;
    examples?: string | null;
  }
  