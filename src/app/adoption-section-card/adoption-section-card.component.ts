import { Component, OnInit } from '@angular/core';
import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox';
import { MD_LIST_DIRECTIVES } from '@angular2-material/list';
import { MD_ICON_DIRECTIVES, MdIconRegistry } from '@angular2-material/icon';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

@Component({
  moduleId: module.id,
  selector: 'app-adoption-section-card',
  templateUrl: 'adoption-section-card.component.html',
  styleUrls: ['adoption-section-card.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES, 
    MD_LIST_DIRECTIVES, 
    MD_CHECKBOX_DIRECTIVES,
    MD_INPUT_DIRECTIVES
    ],
    providers: [MdIconRegistry]
})
export class AdoptionSectionCardComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
