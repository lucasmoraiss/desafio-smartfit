import { Location } from './../../types/location.interface';
import { Component, OnInit } from '@angular/core';
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
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private unitService: GetUnitsService){ }
  
  ngOnInit():void{
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true,
    })
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data.locations;
      this.filteredResults = data.locations
    });
  }

  onSubmit(): void{
    console.log(this.formGroup.value)
    if(!this.formGroup.value.showClosed){
      this.filteredResults = this.results.filter(location => location.opened === true)
    } else{
      this.filteredResults = this.results;
    }
  }

  onClear(): void{
    this.formGroup.reset();
  }
}
