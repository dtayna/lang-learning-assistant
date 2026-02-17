import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VocabularyManagerService } from '../../shared/services/vocabulary-manager.service';
import { Word } from '../../shared/models/word.model';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-vocabulary-manager',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './vocabulary-manager.component.html',
  styleUrl: './vocabulary-manager.component.scss'
})
export class VocabularyManagerComponent implements OnInit {

  words: Word[] = [];

  constructor (
    private service : VocabularyManagerService,
    private formBuilder: FormBuilder,
   ) { }


  ngOnInit() {
    this.getWords();
  }

  wordForm = this.formBuilder.nonNullable.group({
    word: ['', Validators.required],
    translation: [''],
    meaning: [''],
    examples: [''],
  });

  getWords(){
    this.service.getWords().subscribe({
      next: (words) => {
        this.words = words;
      },
      error: (err) => {
        console.error('Error fetching words:', err.message);
      }
    })
  }

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
        this.getWords();
      },
      error: (err) => {
        console.error('Error inserting word:', err.message);
      }

    });
  }

  onDelete( id : number ) {
    this.service.deleteWord(id).subscribe({
      next: () => {
        console.log("deletado")
        this.getWords();
      }
      , error: (err) => {
        console.error('Error deleting word:', err.message);
      }
    });
  }

}
