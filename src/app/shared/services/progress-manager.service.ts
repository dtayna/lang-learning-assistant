import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hour, InsertHour } from '../models/progress.model';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProgressManagerService {

    private apiProgress = `${environment.apiUrl}/progress`;
    private apiHours = `${environment.apiUrl}/hours`;

    constructor(private http: HttpClient) {}

    insertExposureHours( hour : InsertHour ): Observable<Hour[]> {
        return this.http.post<Hour[]>(this.apiHours, hour);
    }

    getExposureHours(): Observable<Hour[]> {
        return this.http.get<Hour[]>(this.apiHours);
    }

    deleteExposureHours( id : number ): Observable<Hour[]> {
        return this.http.delete<Hour[]>(`${this.apiHours}?id=eq.${id}`);
    }

}