import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AdoptionSectionCardComponent } from './adoption-section-card.component';

describe('Component: AdoptionSectionCard', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [AdoptionSectionCardComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([AdoptionSectionCardComponent],
      (component: AdoptionSectionCardComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(AdoptionSectionCardComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(AdoptionSectionCardComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-adoption-section-card></app-adoption-section-card>
  `,
  directives: [AdoptionSectionCardComponent]
})
class AdoptionSectionCardComponentTestController {
}

