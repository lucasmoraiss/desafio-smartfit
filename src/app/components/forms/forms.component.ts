import { Location } from './../../types/location.interface';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GetUnitsService } from '../../services/get-units.service';
import { FilterUnitsService } from '../../services/filter-units.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss',
})
export class FormsComponent implements OnInit {
  @Output() submitEvent = new EventEmitter();
  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private unitService: GetUnitsService, 
    private filterUnitsService: FilterUnitsService) 
    { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true,
    })
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data;
      this.filteredResults = data;
      this.unitService.setFilteredUnits(this.filteredResults);
    });
  }

  //Função de click no botão "ENCONTRAR UNIDADES"
  //Função que chama os métodos abrigados no Service "filter-units"
  onSubmit(): void {
    let {showClosed, hour} = this.formGroup.value;
    this.filteredResults = this.filterUnitsService.filter(this.results, showClosed, hour);
    this.unitService.setFilteredUnits(this.filteredResults);

    this.submitEvent.emit();
  }

  //Função de click no botão "LIMPAR FILTROS"
  onClear(): void {
    this.formGroup.reset();
  }
}
