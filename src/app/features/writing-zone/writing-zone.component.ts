import { Component, OnInit } from '@angular/core'
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'
import { Note } from '../../shared/models/note.model'
import { WritingZoneService } from '../../shared/services/writing-zone.service'
import { MatIcon } from '@angular/material/icon'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-writing-zone',
  standalone: true,
  imports: [ReactiveFormsModule, MatIcon, CommonModule],
  templateUrl: './writing-zone.component.html',
  styleUrl: './writing-zone.component.scss',
})
export class WritingZoneComponent implements OnInit {
  notes: Note[] = []

  constructor(
    private formBuilder: FormBuilder,
    private service: WritingZoneService,
  ) {}

  noteForm = this.formBuilder.nonNullable.group({
    title: [''],
    text: ['', Validators.required],
  })

  ngOnInit() {
    this.getNotes()
  }

  onSubmit() {
    if (this.noteForm.invalid) {
      this.noteForm.markAllAsTouched()
      return
    }

    const formValue = this.noteForm.getRawValue()

    const notePayload = {
      title: formValue.title || null,
      text: formValue.text,
    }

    this.service.insertNote(notePayload).subscribe({
      next: () => {
        this.getNotes()
        this.noteForm.reset()
      },
      error: (err) => {
        console.error('Error creating note:', err.message)
      },
    })
  }

  getNotes() {
    this.service.getNotes().subscribe({
      next: (notes) => {
        this.notes = notes
      },
      error: (err) => {
        console.error('Error fetching notes:', err.message)
      },
    })
  }

  onDelete(id: number) {
    this.service.deleteNote(id).subscribe({
      next: () => {
        this.getNotes()
      },
      error: (err) => {
        console.error('Error deleting note:', err.message)
      },
    })
  }
}
