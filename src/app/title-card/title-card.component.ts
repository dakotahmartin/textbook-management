import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon';
import { MD_CHECKBOX_DIRECTIVES } from '@angular2-material/checkbox';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';


@Component({
  moduleId: module.id,
  selector: 'app-title-card',
  templateUrl: 'title-card.component.html',
  styleUrls: ['title-card.component.css'],
  viewProviders: [MdIconRegistry],
  directives: [MD_CARD_DIRECTIVES,MD_INPUT_DIRECTIVES,MD_CHECKBOX_DIRECTIVES,MD_BUTTON_DIRECTIVES]
})
export class TitleCardComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
