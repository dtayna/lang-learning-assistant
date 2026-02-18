import { Component , OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormArray, NonNullableFormBuilder } from '@angular/forms';
import { ProgressManagerService } from '../../shared/services/progress-manager.service';
import { ProgressConfigService } from '../../core/config/progress-config.service';
import { CEFRLevel } from '../../core/config/progress-config';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Hour, InsertHour } from '../../shared/models/progress.model';

@Component({
  selector: 'app-progress-manager',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon, CommonModule],
  templateUrl: './progress-manager.component.html',
  styleUrl: './progress-manager.component.scss'
})
export class ProgressManagerComponent implements OnInit {

  exposureHours: Hour[] = [];

  exposureHoursForm = this.formBuilder.group({
    exposureHours : [0, [Validators.required, Validators.min(0)]],
    exposureType: this.formBuilder.array([]) ,
    description : ['']
  });

  constructor (
    private formBuilder : NonNullableFormBuilder,
    private service : ProgressManagerService
    ){}

  ngOnInit() {
      this.getExposureHours();
  }

  getExposureHours(){
    this.service.getExposureHours().subscribe({
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

    const hourPayload: InsertHour = {
      exposureHours: formValue.exposureHours,
      exposureType: formValue.exposureType.join(', '),
      description: formValue.description || null,
    };

    this.service.insertExposureHours(hourPayload).subscribe({
      next: () => {
        this.getExposureHours();
        this.exposureHoursForm.reset();
      },
      error: (err) => {
        console.error('Error inserting exposure hours:', err.message);
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
    this.service.deleteExposureHours(id).subscribe({ 
      next : () => {
        this.getExposureHours();
      },
      error: (err) => {
        console.error('Error deleting exposure hours:', err.message);
      }
    });
  }
}
