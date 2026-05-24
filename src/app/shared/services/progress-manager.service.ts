import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { TimeProgress, InsertTimeProgress } from '../models/progress.model'
import { environment } from '../../../environments/environment'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ProgressManagerService {
  private apiProgress = `${environment.apiUrl}/progress`
  private apiTimeProgress = `${environment.apiUrl}/time_progress`

  constructor(private http: HttpClient) {}

  insertTimeProgress(
    time_progress: InsertTimeProgress,
  ): Observable<TimeProgress[]> {
    return this.http.post<TimeProgress[]>(this.apiTimeProgress, time_progress)
  }

  getTimeProgress(): Observable<TimeProgress[]> {
    return this.http.get<TimeProgress[]>(this.apiTimeProgress)
  }

  deleteTimeProgress(id: number): Observable<TimeProgress[]> {
    return this.http.delete<TimeProgress[]>(`${this.apiTimeProgress}/${id}`)
  }

  getTotalTimeProgress(): Observable<number> {
    return this.http.post<number>(
      `${this.apiTimeProgress}/get_total_time_progress`,
      {},
    )
  }
}
