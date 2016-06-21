import { Component, OnInit } from '@angular/core';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { TitleCardComponent } from './title-card/title-card.component';
import { AdoptedOnCardComponent } from './adopted-on-card/adopted-on-card.component';
import { AdoptionSectionCardComponent } from './adoption-section-card/adoption-section-card.component';
import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';
import { DataService } from './data.service';
import { HTTP_PROVIDERS } from '@angular/http';
import 'rxjs/Rx'; //Load all features


@Component({
  moduleId: module.id,
  selector: 'textbook-management-app',
  templateUrl: 'textbook-management.component.html',
  styleUrls: ['textbook-management.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES, 
    MD_TOOLBAR_DIRECTIVES, 
    MD_SIDENAV_DIRECTIVES, 
    MD_LIST_DIRECTIVES, 
    TitleCardComponent,
    MD_CHECKBOX_DIRECTIVES,
    AdoptedOnCardComponent,
    AdoptionSectionCardComponent,
    MD_GRID_LIST_DIRECTIVES
    ],
    
    providers: [
    ROUTER_PROVIDERS, 
    MdIconRegistry, 
    DataService,
    HTTP_PROVIDERS
    ]
    
})

export class TextbookManagementAppComponent {
  constructor(private _dataService: DataService) {
  }
  
  title = 'textbook-management works!';
  schoolMenu: boolean = false;
  termDropdown: boolean = false;
  termMenu: boolean = false;
  schoolMenuSelector = 'Weber State University';
  termDropdownSelector = 'Summer 2016';
  schools: any[];
  terms: any[];

  toggleSchoolMenu(): void{
    this.schoolMenu = !this.schoolMenu;
  } 
  
  updateSchoolMenu(value): void{
    this.schoolMenuSelector = value
  }
  
  toggleTermDropdown(): void{
    this.termDropdown = !this.termDropdown;
    if (this.termDropdown) {
      document.getElementById("term-dd").style.backgroundColor = '#eee';
    }
    else {
      document.getElementById("term-dd").style.backgroundColor = '#fff';
    }
  } 
  
  updateTermDropdown(value): void{
      this.termDropdownSelector = value
  }
  
  toggleTermMenu(): void{
    this.termMenu = !this.termMenu;
  } 
  
  ngOnInit(): void {
    
      this._dataService.getSchools()
      .subscribe(schools => this.schools = schools);
      
      this._dataService.getTerms()
      .subscribe(terms => this.terms = terms);

      
  }
  
}


