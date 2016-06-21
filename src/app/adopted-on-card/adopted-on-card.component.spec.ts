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
import { AdoptedOnCardComponent } from './adopted-on-card.component';

describe('Component: AdoptedOnCard', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [AdoptedOnCardComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([AdoptedOnCardComponent],
      (component: AdoptedOnCardComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(AdoptedOnCardComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(AdoptedOnCardComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-adopted-on-card></app-adopted-on-card>
  `,
  directives: [AdoptedOnCardComponent]
})
class AdoptedOnCardComponentTestController {
}

