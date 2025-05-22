import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

export interface DynamicFormField {
  name: string;
  label: string;
  type: string;
  value?: any;
  options?: { label: string; value: any }[];
  validators?: any[];
  inputClass?: string;
  rows?: number;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  @Input() fields: DynamicFormField[] = [];
  @Input() submitLabel = 'Submit';
  @Input() initialValues: any = {};
  @Output() formSubmit = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  form: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['initialValues']) {
      this.buildForm();
      // Patch values if editing (to preserve untouched/dirty state)
      if (this.initialValues && Object.keys(this.initialValues).length > 0) {
        this.form.patchValue(this.initialValues);
      }
    }
  }

  buildForm() {
    const group: { [key: string]: any } = {};
    this.fields.forEach(field => {
      group[field.name] = [
        this.initialValues[field.name] ?? field.value ?? '',
        field.validators || []
      ];
    });
    this.form = this.fb.group(group);
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  onSubmit() {
    if (this.form.valid) {
      this.formSubmit.emit(this.form.value);
      // Do not reset or hide the form here; let parent handle show/hide
    } else {
      this.form.markAllAsTouched();
    }
  }

  // Add a method to handle closing the popup
  closePopup() {
    this.form.reset();
    this.close.emit();
  }
}
