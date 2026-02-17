import { Component } from '@angular/core';
import {  FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VocabularyManagerService } from '../../shared/services/vocabulary-manager.service';
@Component({
  selector: 'app-vocabulary-manager',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './vocabulary-manager.component.html',
  styleUrl: './vocabulary-manager.component.scss'
})
export class VocabularyManagerComponent {

  constructor(
    private service : VocabularyManagerService,
    private formBuilder: FormBuilder,
   ) { }

  wordForm = this.formBuilder.nonNullable.group({
    word: ['', Validators.required],
    translation: [''],
    meaning: [''],
    examples: [''],
  });

  onSubmit() {

    if (this.wordForm.invalid) {
      this.wordForm.markAllAsTouched();
      return;
    }

    const formValue = this.wordForm.getRawValue();

    const wordPayload = {
      word: formValue.word,
      translation: formValue.translation || null,
      meaning: formValue.meaning || null,
      examples: formValue.examples || null,
    }

    this.service.insertWord(wordPayload).subscribe({
      next: () => {
        console.log("salvo")
        this.wordForm.reset();
      },
      error: (err) => {
        console.error('Error inserting word:', err.message);
      }

    });
  }

}
