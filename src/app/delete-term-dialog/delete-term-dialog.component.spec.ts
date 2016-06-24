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
import { DeleteTermDialogComponent } from './delete-term-dialog.component';

describe('Component: DeleteTermDialog', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [DeleteTermDialogComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([DeleteTermDialogComponent],
      (component: DeleteTermDialogComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(DeleteTermDialogComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(DeleteTermDialogComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-delete-term-dialog></app-delete-term-dialog>
  `,
  directives: [DeleteTermDialogComponent]
})
class DeleteTermDialogComponentTestController {
}

