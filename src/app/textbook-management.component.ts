import { Component, OnInit } from '@angular/core';
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
import { EditTermDialogComponent } from './edit-term-dialog';
import { Routes , ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from '@angular/router';
import { DeleteTermDialogComponent } from './delete-term-dialog';



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
    EditTermDialogComponent,
    DeleteTermDialogComponent,
    MD_GRID_LIST_DIRECTIVES,
    ROUTER_DIRECTIVES
    ],
    
    providers: [
    MdIconRegistry, 
    DataService,
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS
    ]
    
})


export class TextbookManagementAppComponent {
  constructor(private _dataService: DataService, private _router: Router) {
  }
  
  schoolDropdown: boolean = false;
  termDropdown: boolean = false;
  departmentDropdown: boolean = false;
  termMenu: boolean = false;
  departmentMenu: boolean = false;
  adoptionsMenu: boolean = false;
  overlay: boolean = false;
  editTerm: boolean = false;
  schoolDisplayed: string;
  schoolSelectedId: string;
  termDisplayed: string;
  termSelectedId: string;
  selectedDepartment: string = '--';
  selectedAdoption: string = '';
  priorSelectedAdoption: any;
  schools: any[];
  terms: any[];
  adoptionsByTitle: any[];

  toggleSchoolDropdown(): void{
    this.schoolDropdown = !this.schoolDropdown;
  } 
  
  /** This function updates the name displayed on the School dropdown and makes a call
   * to return all available Terms for that school
   */
  
  updateSchoolDropdown(name, url, id): void{
    this.schoolDisplayed = name;
  }
  
  loadTerms(url: string): void{
    this._dataService.getTerms(url)
    .subscribe(terms => this.terms = terms);
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
  
  updateTermDropdown(value): void {
      this.termDisplayed = value
  }
  
  toggleTermMenu(): void {
    this.termMenu = !this.termMenu;
    if (this.termMenu) {
        document.getElementById("term-dd").style.backgroundColor = '#eee';
      }
      else {
        document.getElementById("term-dd").style.backgroundColor = '#fff';
      }
  }
  
  toggleDepartmentDropdown(): void{
    this.departmentDropdown = !this.departmentDropdown;
    if (this.departmentDropdown) {
      document.getElementById("department-dd").style.backgroundColor = '#eee';
    }
    else {
      document.getElementById("department-dd").style.backgroundColor = '#fff';
    }
  } 
  
  updateDepartmentDropdown(value): void {
      this.selectedDepartment = value
  }
  
  toggleDepartmentMenu(): void {
    this.departmentMenu = !this.departmentMenu;
    if (this.departmentMenu) {
      document.getElementById("department-dd").style.backgroundColor = '#eee';
    }
    else {
      document.getElementById("department-dd").style.backgroundColor = '#fff';
    }
  } 
  
  toggleAdoptionsMenu(): void {
    this.adoptionsMenu = !this.adoptionsMenu;
  }
  
  openOverlay(): void {
    this.overlay = true;
  }

  closeOverlay(): void {
    this.overlay = false;
  }
  
  toggleEditTermDialog(): void {
    this.editTerm = !this.editTerm;
  }
  
  selectAdoption(value): void {
    this.selectedAdoption = value;
    if (this.priorSelectedAdoption) {
      document.getElementById(this.priorSelectedAdoption).style.backgroundColor = '#fff';
    }
    document.getElementById(value).style.backgroundColor = '#eee';
    this.priorSelectedAdoption = value; 
  }
  
  
  /** On initialization of the page, fetch the schools. This will later need to be done by location
   * ID. Auto-select the first school, assign the school name to the schoolDisplayed variable and 
   * call the getTerms method passing in the childUrl from that school. This will load all terms 
   * associated with that school, save the terms object to the terms variable and assign the term 
   * name to the termDisplayed variable. Finally load all adoptions related to the selected term.
   */
  
  ngOnInit(): void {
    
        this._dataService.getSchools().subscribe(schools => 
        {
        this.schools = schools;
        this.schoolDisplayed = this.schools[0].name;
        this._dataService.getTerms(this.schools[0].childUrl).subscribe(terms => {
        this.terms = terms;
        this.termDisplayed = this.terms[0].name})
        this._dataService.getAdoptionsByTitle().subscribe(adoptionsByTitle => 
        this.adoptionsByTitle = adoptionsByTitle);
        });
  }
  

  
}


