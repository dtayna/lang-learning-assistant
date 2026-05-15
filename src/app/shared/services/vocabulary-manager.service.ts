import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Word, InsertWord } from '../models/word.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VocabularyManagerService {

    private api = `${environment.apiUrl}/words`;

    constructor(private http: HttpClient) {}

    insertWord( word : InsertWord ): Observable<Word[]> {
        return this.http.post<Word[]>(this.api, word);
    }

    getWords(): Observable<Word[]> {
        return this.http.get<Word[]>(this.api);
    }

    deleteWord( id : number ): Observable<Word[]> {
        return this.http.delete<Word[]>(`${this.api}/${id}`);
    }
}