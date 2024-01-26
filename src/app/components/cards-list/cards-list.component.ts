import { Component, Input, OnInit } from '@angular/core';
import { Location } from '../../types/location.interface';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CardComponent } from '../card/card.component';
import { GetUnitsService } from '../../services/get-units.service';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, CardComponent],
  templateUrl: './cards-list.component.html',
  styleUrl: './cards-list.component.scss'
})
export class CardsListComponent implements OnInit {
   @Input() unitsList: Location[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}
