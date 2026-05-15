import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note, InsertNote } from '../models/note.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class WritingZoneService {

    private api = `${environment.apiUrl}/notes`;

    constructor(private http: HttpClient) {}

    insertNote( note : InsertNote): Observable<Note[]> {
        return this.http.post<Note[]>(this.api, note);
    }

    getNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(this.api).pipe(
            map(notes =>
              notes.map(note => ({
                id: note.id,
                title: note.title,
                text: note.text,
                created_at: note.created_at
                  ? new Date(note.created_at)
                  : null
              }))
            )
        );
    }

    deleteNote( id : number ): Observable<Note[]> {
        return this.http.delete<Note[]>(`${this.api}/${id}`);
    }
}