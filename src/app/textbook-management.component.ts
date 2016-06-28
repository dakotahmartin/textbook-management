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
   
  updateSchoolDropdown(name, id, childUrl): void{
    console.log("in updateSchoolDropdown() method");
    console.log("updated schoolDisplayed to " + name + " and schoolId to" + id);
    this.schoolDisplayed = name;
    this.schoolSelectedId = id;
    this.termDisplayed = "--";
    this.departmentDisplayed = "--";
    this.courseDisplayed = "--";
    this.sectionDisplayed = "--";
    this.termSelectedId = null;
    this.departmentSelectedId = null;
    this.courseSelectedId = null;
    this.sectionSelectedId = null;
    this.terms = [{"name":"--","id":null,"childUrl":null,"adoptionsUrl":null}];
    console.log("clearing term list. " + "Term Name = " + this.terms[0].name);
    this.departments = [{"name":null,"id":null,"childUrl":null,"adoptionsUrl":null}];
    console.log("clearing department list. " + "Department Name = " + this.departments[0].name);
    this.courses = [{"name":null,"id":null,"childUrl":null,"adoptionsUrl":null}];
    console.log("clearing courses list. " + "Course Name = " + this.courses[0].name);
    this.sections = [{"name":null,"id":null,"childUrl":null,"adoptionsUrl":null}];
    console.log("clearing sections list. " + "Section Name = " + this.sections[0].name);
    this.adoptionsByTitle = [];
    console.log("clearing adoptions list. ");
    console.log("calling loadTerms with " + childUrl);
    if (childUrl) {
      this.loadTerms(childUrl)
    } else { alert("no childUrl!")}
  }
  
    updateTermDropdown(name, id, childUrl, adoptionsUrl): void {
      console.log("in updateTermDropdown() method");
      console.log("+++ parameters passed into updateTermDropdownMethod " + name + id + childUrl + adoptionsUrl)
      this.termDisplayed = name;
      this.termSelectedId = id;
      this.departmentDisplayed = "--";
      this.courseDisplayed = "--";
      this.sectionDisplayed = "--";
      this.departmentSelectedId = null;
      this.courseSelectedId = null;
      this.sectionSelectedId = null;
      console.log("updated term name to " + this.termDisplayed + " and term id to" + this.termSelectedId);
      this.departments = [{"name":null,"id":null,"childUrl":null,"adoptionsUrl":null}];
      console.log("clearing department list. " + "Department Name = " + this.departments[0].name);
      this.courses = [{"name":null,"id":null,"childUrl":null,"adoptionsUrl":null}];
      console.log("clearing courses list. " + "Course Name = " + this.courses[0].name);
      this.sections = [{"name":null,"id":null,"childUrl":null,"adoptionsUrl":null}];
      console.log("clearing sections list. " + "Section Name = " + this.sections[0].name);
      this.adoptionsByTitle = [];
      console.log("clearing adoptions list. " + "cleared = " + this.adoptionsByTitle);
      console.log("calling for departments, will not auto load a department, only ready list for user.");
      if (childUrl) {
        this.loadDepartments(childUrl)
      } else { alert("no childUrl on Term " + this.termDisplayed + childUrl)};
      console.log("calling for adoptions from updateTermDropdown, will automatically select the first adoption in the list. This will always happen.");
      if (adoptionsUrl) {
        this.loadAdoptions(adoptionsUrl)
      } else { alert("no adoptionsUrl on Term " + this.termDisplayed)};
      console.log("leaving updateTermDropdown() method")
  }
  
  updateDepartmentDropdown(name, id, childUrl, adoptionsUrl): void {
      console.log("in updateDepartmentDropdown() method");
      this.departmentDisplayed = name;
      this.departmentSelectedId = id;
      this.courseDisplayed = "--";
      this.sectionDisplayed = "--";
      this.courseSelectedId = null;
      this.sectionSelectedId = null;
      console.log("updated term name to " + this.departmentDisplayed + " and term id to" + this.departmentSelectedId);
      this.courses = [{"name":null,"id":null,"childUrl":null,"adoptionsUrl":null}];
      console.log("clearing courses list. " + "Course Name = " + this.courses[0].name);
      this.sections = [{"name":null,"id":null,"childUrl":null,"adoptionsUrl":null}];
      console.log("clearing sections list. " + "Section Name = " + this.sections[0].name);
      this.adoptionsByTitle = [];
      console.log("clearing adoptions list. ");
      console.log("calling for departments, will not auto load a department, only ready list for user.");
      if (childUrl) {
        this.loadCourses(childUrl)
      } else { alert("no childUrl on Department " + this.courseDisplayed + childUrl)};
      console.log("calling for adoptions from updateDepartmentDropdown, will automatically select the first adoption in the list. This will always happen.");
      if (adoptionsUrl) {
        this.loadAdoptions(adoptionsUrl)
      } else { alert("no adoptionsUrl on Department " + this.departmentDisplayed)};
      console.log("leaving updateDepartmentDropdown() method. Course list is now ready for user. well not really yet, still have to do that.")
  }
  
  updateCourseDropdown(name, id, childUrl, adoptionsUrl): void {
      console.log("in updateCourseDropdown() method");
      this.courseDisplayed = name;
      this.courseSelectedId = id;
      this.sectionDisplayed = "--";
      this.sectionSelectedId = null;
      console.log("updated course name to " + this.courseDisplayed + " and course id to" + this.courseSelectedId);
      this.sections = [{"name":null,"id":null,"childUrl":null,"adoptionsUrl":null}];
      console.log("clearing sections list. " + "Section Name = " + this.sections[0].name);
      this.adoptionsByTitle = [];
      console.log("clearing adoptions list. ");
      console.log("calling for sections, will not auto load a section, only ready list for user.");
      if (childUrl) {
        this.loadSections(childUrl)
      } else { alert("no childUrl on course " + this.sectionDisplayed + childUrl)};
      console.log("calling for adoptions from updateCourseDropdown, will automatically select the first adoption in the list. This will always happen.");
      if (adoptionsUrl) {
        this.loadAdoptions(adoptionsUrl)
      } else { alert("no adoptionsUrl on course " + this.courseDisplayed)};
      console.log("leaving updateCourseDropdown() method. Section list is now ready for user. well not really yet, still have to do that.")
  }
  
  updateSectionDropdown(name, id, adoptionsUrl): void {
      console.log("in updateSectionDropdown() method");
      this.sectionDisplayed = name;
      this.sectionSelectedId = id;
      console.log("updated section name to " + this.sectionDisplayed + " and section id to" + this.sectionSelectedId);
      this.adoptionsByTitle = [];
      console.log("clearing adoptions list. ");
      console.log("calling for adoptions from updateSectionDropdown(), will automatically select the first adoption in the list. This will always happen.");
      if (adoptionsUrl) {
        this.loadAdoptions(adoptionsUrl)
      } else { alert("no adoptionsUrl on section " + this.sectionDisplayed)};
      console.log("leaving updateSectionDropdown() method.")
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
    console.log("in loadTerms() method");
    console.log("calling for terms");
    this._dataService.getTerms(url)
    .subscribe(terms => {
    this.terms = terms;
    console.log("Loading Terms from..." + url);
    console.log("saving terms to terms variable, here's the proof: " + this.terms[0].name)
    console.log("calling updateTermDropdown() method. This is automatically done after selecting a school. Passing in first term on the list: " + this.terms[0].name, this.terms[0].id, this.terms[0].childUrl, this.terms[0].adoptionsUrl)
    this.updateTermDropdown(this.terms[0].name, this.terms[0].id, this.terms[0].childUrl, this.terms[0].adoptionsUrl);
    console.log("leaving loadTerms method");
    }) 
  } 
  
  loadDepartments(url: string): void {
    console.log("in loadDepartments() method")
    console.log("calling for departments");
    this._dataService.getDepartments(url)
    .subscribe(departments => {
    this.departments = departments;
    console.log("Loading Departments..." + url);
    console.log("departments loaded, here's the proof " + departments[0].name);
    console.log("leaving loadDepartments() method. The departments dropdown is now ready for the user")
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
    console.log("in loadAdoptions() method")
    console.log("calling for adoptions")
    this._dataService.getAdoptionsByTitle(url)
    .subscribe(adoptionsByTitle => {
    this.adoptionsByTitle = adoptionsByTitle;
    console.log("Loading Adoptions..." + url);
    console.log("adoptions loaded, here's the proof: " + this.adoptionsByTitle[0].title)
    console.log("leaving loadAdoptions() method.")
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
    alert("function called, " + adoption.selected);
    adoption.selected = !adoption.selected;
    alert(adoption.selected + "from toggleCheckmark function")
  }
  
  /** On initialization of the page, fetch the schools. This will later need to be done by location
   * ID. Call the updateSchoolDropdown function passing in the first school's name and ID. 
   * call the getTerms method passing in the childUrl from that school. This will load all terms 
   * associated with that school. Call the updateTermDropdown and pass in the first term's name and 
   * ID. Finally load all adoptions related to the selected term.
   */
  
  ngOnInit(): void {
    
        this._dataService.getSchools().subscribe(schools => 
        {
          console.log("calling for schools");
        this.schools = schools;
          console.log("Schools saved to schools variable");
          console.log("calling updateSchoolDropdown() method from ngOnInit");
        this.updateSchoolDropdown(this.schools[0].name,this.schools[0].id, this.schools[0].childUrl);
          console.log("leaving ngOnInit")
        })
  }
  

  
}


