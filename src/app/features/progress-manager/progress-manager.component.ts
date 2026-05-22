import { Component , OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray, NonNullableFormBuilder } from '@angular/forms';
import { ProgressManagerService } from '../../shared/services/progress-manager.service';
import { ProgressConfigService } from '../../core/config/progress-config.service';
import { CEFRLevel } from '../../core/config/progress-config';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TimeProgress, InsertTimeProgress } from '../../shared/models/progress.model';
import { NgxMaskDirective } from 'ngx-mask';
import { TimeService } from '../../shared/utils/time.service';

@Component({
  selector: 'app-progress-manager',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon, CommonModule, NgxMaskDirective],
  templateUrl: './progress-manager.component.html',
  styleUrl: './progress-manager.component.scss'
})
export class ProgressManagerComponent implements OnInit {

  exposureHours: TimeProgress[] = [];
  totalExposureHours: number = 0;
  level : CEFRLevel = 'A1';

  exposureHoursForm = this.formBuilder.group({
    exposureHours : ['', [Validators.required]],
    exposureType: this.formBuilder.array([]) ,
    description : ['']
  });

  constructor (
    private formBuilder : NonNullableFormBuilder,
    private service : ProgressManagerService,
    private progressConfigService : ProgressConfigService,
    private timeService: TimeService
    ){}

  ngOnInit() {
      this.getTimeProgress();
      this.getTotalExposureHours();
  }

  getTimeProgress(){
    this.service.getTimeProgress().subscribe({
      next: (hours) => {
        this.exposureHours = hours;
      },
      error: (err) => {
        console.error('Error fetching exposure hours:', err.message);
      }
    });
  }

  onSubmit(){
    if (this.exposureHoursForm.invalid) {
      this.exposureHoursForm.markAllAsTouched();
      return;
    }

    const formValue = this.exposureHoursForm.getRawValue();

    const hourPayload: InsertTimeProgress = {
      exposureHours: this.timeService.timeStringToFloat(formValue.exposureHours.toString()),
      exposureType: formValue.exposureType.join(', '),
      description: formValue.description || null,
    };

    this.service.insertTimeProgress(hourPayload).subscribe({
      next: () => {
        this.getTimeProgress();
        this.exposureHoursForm.reset();
      },
      error: (err) => {
        console.error('Error inserting exposure hours:', err.message);
        console.error('FastAPI detail:', err.error);
      }
    });
  }

  get exposureTypeArray(): FormArray {
    return this.exposureHoursForm.get('exposureType') as FormArray;
  }
  
  onCheckboxChange(event: any) {
    const value = event.target.value;
  
    if (event.target.checked) {
      this.exposureTypeArray.push(this.formBuilder.control(value));
    } else {
      const index = this.exposureTypeArray.controls.findIndex(x => x.value === value);
      this.exposureTypeArray.removeAt(index);
    }
  }

  onDelete( id : number ){
    this.service.deleteTimeProgress(id).subscribe({ 
      next : () => {
        this.getTimeProgress();
      },
      error: (err) => {
        console.error('Error deleting exposure hours:', err.message);
      }
    });
  }

  getTotalExposureHours() {
    this.service.getTotalTimeProgress().subscribe({
      next: (totalExposureHours) => {
        this.totalExposureHours = totalExposureHours || 0;
        this.level = this.getLevelByHours();
      },
      error: (err) => {
        console.error('Error fetching total exposure hours:', err.message);
      }
    });
  }

  getLevelByHours(): CEFRLevel {
    return this.totalExposureHours > 0
      ? this.progressConfigService.getLevelFromExposureHours(this.totalExposureHours)
      : 'A1';
  }

  timeConverter(time: number): string {
    return this.timeService.timeFloatToString(time);
  }

}
