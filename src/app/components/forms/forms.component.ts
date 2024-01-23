import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent {
  results = [];
  formGroup!: FormGroup;

  onSubmit(): void{
    console.log(this.formGroup.value)
  }

  onClear(): void{
    this.formGroup.reset();
  }

  constructor(private formBuilder: FormBuilder){
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false,
    })
  }
}
