import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';

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

  constructor(private formBuilder: FormBuilder, private unitService: GetUnitsService){
    this.unitService.getAllUnits().subscribe(data => console.log(data));
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: false,
    })
  }
}
