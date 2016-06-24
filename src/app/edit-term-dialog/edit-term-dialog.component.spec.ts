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
import { EditTermDialogComponent } from './edit-term-dialog.component';

describe('Component: EditTermDialog', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [EditTermDialogComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([EditTermDialogComponent],
      (component: EditTermDialogComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(EditTermDialogComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(EditTermDialogComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-edit-term-dialog></app-edit-term-dialog>
  `,
  directives: [EditTermDialogComponent]
})
class EditTermDialogComponentTestController {
}

