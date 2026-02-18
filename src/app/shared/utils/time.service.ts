import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TimeService {

    timeStringToFloat(time: string): number {
        if (!time) return 0;
      
        const hours = Number(time.slice(0, -2));
        const minutes = Number(time.slice(-2));
        const decimalMinutes = minutes / 60;
        
        return hours + decimalMinutes;
      }
    
    timeFloatToString(time: number): string {
        if (!time) return "00:00";
      
        const hours = Math.floor(time);
        const decimalMinutes = hours - time;
        const minutes = Math.abs(decimalMinutes * 60);
        
        return hours + ":" + (minutes < 10 ? "0" + minutes : minutes);
      }
}