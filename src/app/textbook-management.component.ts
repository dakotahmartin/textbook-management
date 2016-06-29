import { Component, OnInit } from '@angular/core';
import { NgSwitch, NgSwitchWhen, NgSwitchDefault } from '@angular/common'
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
    ROUTER_DIRECTIVES,
    NgSwitch,
    NgSwitchWhen,
    NgSwitchDefault
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
    this._dataService = _dataService;
  }
  
  /** This variable hides / shows a tint over the page for dialogs. */
  overlay: boolean = false;
  
  /** These variables keep track of the display status of the dialogs */
  editTerm: boolean = false;
  currentAdoptionSelected: string;
  
  title = 'textbook-management works!'
  
  /** These variables keep track of the string displayed for each dropdown item in the catalog tree */
  schoolDisplayed: string = "--"
  termDisplayed: string = "--";
  departmentDisplayed: string = "--";
  courseDisplayed: string = "--";
  sectionDisplayed: string = "--";
  
  /** These variables keep track of the id of the element being displayed, so that the user can perform
   * actions such as Edit Term on the correct element. */
  schoolSelectedId: string;
  termSelectedId: string;
  departmentSelectedId: string;
  courseSelectedId: string;
  sectionSelectedId: string;
  selectedAdoptions: any[];
  
  priorSelectedAdoption: any;
  currentDropdownState: string;
  
  /** These variables are arrays containing the objects returned from rest.  */
  schools: any[];
  terms: any[];
  departments: any[];
  courses: any[];
  sections: any[];
  adoptionsByTitle: any[];



  /** This method is tied to the ngSwitch directive, used for the custom dropdowns and menus. This will toggle the dropdown on a click event. */ 
  toggleDropdownState(currentState): void{
    this.currentDropdownState = currentState;
  }
  
  
  /** These functions update the name displayed on the dropdown and updates the 
   * --SelectedId variable. */
   
  updateSchoolDropdown(school): void{
    this.schoolDisplayed = school.name;
    this.schoolSelectedId = school.id;
    
    this.termDisplayed = "--";
    this.departmentDisplayed = "--";
    this.courseDisplayed = "--";
    this.sectionDisplayed = "--";
    this.termSelectedId = null;
    this.departmentSelectedId = null;
    this.courseSelectedId = null;
    this.sectionSelectedId = null;
    this.terms = [];
    this.departments = [];
    this.courses = [];
    this.sections = [];
    this.adoptionsByTitle = [];
    if (school.childrenUrl) {
      this.loadTerms(school.childrenUrl)
    } else { alert("no childrenUrl!")}
  }
  
    updateTermDropdown(term): void {
      this.termDisplayed = term.name;
      this.termSelectedId = term.id;
      this.departmentDisplayed = "--";
      this.courseDisplayed = "--";
      this.sectionDisplayed = "--";
      this.departmentSelectedId = null;
      this.courseSelectedId = null;
      this.sectionSelectedId = null;
      this.departments = [];
      this.courses = [];
      this.sections = [];
      this.adoptionsByTitle = [];
      if (term.childrenUrl) {
        this.loadDepartments(term.childrenUrl)
      } else { alert("no childrenUrl on Term ")};
      if (term.titlesUrl != null) {
        this.loadAdoptions(term.titlesUrl)
      } else { alert("no adoptionsUrl on Term " + this.termDisplayed)};
      console.log("leaving updateTermDropdown() method")
  }
  
  updateDepartmentDropdown(department): void {
      this.departmentDisplayed = department.name;
      this.departmentSelectedId = department.id;
      this.courseDisplayed = "--";
      this.sectionDisplayed = "--";
      this.courseSelectedId = null;
      this.sectionSelectedId = null;
      this.courses = [];
      this.sections = [];
      this.adoptionsByTitle = [];
      if (department.childrenUrl) {
        this.loadCourses(department.childrenUrl)
      } else { alert("no childUrl on Department")};
      if (department.titlesUrl) {
        this.loadAdoptions(department.titlesUrl)
      } else { alert("no adoptionsUrl on Department " + this.departmentDisplayed)};
  }
  
  updateCourseDropdown(course): void {
      console.log("in updateCourseDropdown() method");
      this.courseDisplayed = course.name;
      this.courseSelectedId = course.id;
      this.sectionDisplayed = "--";
      this.sectionSelectedId = null;
      this.sections = [];
      this.adoptionsByTitle = [];
      if (course.childrenUrl) {
        this.loadSections(course.childrenUrl)
      } else { alert("no childUrl on course ")};
      if (course.titlesUrl) {
        this.loadAdoptions(course.titlesUrl)
      } else { alert("no adoptionsUrl on course " + this.courseDisplayed)};
  }
  
  updateSectionDropdown(section): void {
      this.sectionDisplayed = section.name;
      this.sectionSelectedId = section.id;
      this.adoptionsByTitle = [];
      if (section.titlesUrl) {
        this.loadAdoptions(section.titlesUrl)
      } else { alert("no adoptionsUrl on section ")};
  }
  
  
  adoptionSelected(adoptionId,titleCardUrl): void {
    this.currentAdoptionSelected = adoptionId;
    if (this.priorSelectedAdoption) {
      document.getElementById(this.priorSelectedAdoption).style.backgroundColor = 'inherit';
    }
    document.getElementById(adoptionId).style.backgroundColor = '#eee';
    this.priorSelectedAdoption = adoptionId; 
    if (titleCardUrl) {
      this.loadTitleCard(titleCardUrl)
    } else { alert("no titleCardUrl on selected adoption: " + this.currentAdoptionSelected)};
  }
  
  
  /** These functions call the dataService class to load elements. These also update the 
   * dropdown immediately below with the first object in the array. */
  
  loadTerms(url: string): void{
    this._dataService.getTerms(url)
    .subscribe(terms => {
    this.terms = terms;
    let term = terms[0];
    this.updateTermDropdown(term);
    }) 
  } 
  
  loadDepartments(url: string): void {
    this._dataService.getDepartments(url)
    .subscribe(departments => {
    this.departments = departments;
    })
  }
  
  loadCourses(url:string): void {
    console.log("in loadCourses() method")
    console.log("calling for courses");
    this._dataService.getCourses(url)
    .subscribe(courses => {
    this.courses = courses;
    console.log("Loading Courses..." + url);
    console.log("courses loaded, here's the proof " + courses[0].name);
    console.log("leaving loadCourses() method. The courses dropdown is now ready for the user")
    })
  }
  
  loadSections(url:string): void {
    console.log("in loadSections() method")
    console.log("calling for sections");
    this._dataService.getSections(url)
    .subscribe(sections => {
    this.sections = sections;
    console.log("Loading sections..." + url);
    console.log("sections loaded, here's the proof " + sections[0].name);
    console.log("leaving loadSections() method. The section dropdown is now ready for the user")
    })
  }
  
  loadAdoptions(url: string): void {
    this._dataService.getAdoptionsByTitle(url)
    .subscribe(adoptionsByTitle => {
    this.adoptionsByTitle = adoptionsByTitle
    })
  }
  
  loadTitleCard(url: string): void {
    this._dataService.getTitleCard(url)
    .subscribe(adoptionsByTitle => this.adoptionsByTitle = adoptionsByTitle)
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
  
  selectAllSelectNone(): void {
    for (let adoption of this.adoptionsByTitle) {
      adoption.selected = true;
      console.log(adoption.selected)
    }
  }
  
  createOrder(): void {
    for (let adoption of this.adoptionsByTitle) {
      if (adoption.selected == true) {
      console.log(adoption.selected + adoption.id) }
    }
  }
  
  toggleCheckmark(adoption): void {
    alert("function called, " + adoption.selected + adoption.id);
    adoption.selected = !adoption.selected;
    alert(adoption.selected + " from toggleCheckmark function")
  }
  
  /** On initialization of the page, fetch the schools. This will later need to be done by location
   * ID. Call the updateSchoolDropdown function passing in the first school's name and ID.
   */
  
  ngOnInit(): void {
    
        alert("This isn't working because I left out the authToken to hit the API. Add this to the data.services.ts file.");
    
        this._dataService.getSchools().subscribe(schools => 
        {
        this.schools = schools;
        let school = schools[0];
        this.updateSchoolDropdown(school);
        })
  }
  

  
}


