import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FormsComponent } from "./components/forms/forms.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CardsListComponent } from './components/cards-list/cards-list.component';
import { Location } from './types/location.interface';
import { GetUnitsService } from './services/get-units.service';
import { CaptionComponent } from './components/caption/caption.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [CommonModule, RouterOutlet, HeaderComponent, FormsComponent,
       ReactiveFormsModule, FormsModule, CardsListComponent, CaptionComponent, FooterComponent]
})
export class AppComponent {
  title = "desafio-smartfit"

  showList = new BehaviorSubject(false);
  unitsList: Location[] = [];

  constructor(private unitsService: GetUnitsService){

  }

  onSubmit(){
    this.unitsList = this.unitsService.getFilteredUnits()
    this.showList.next(true);
  }
}
