import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { TextbookManagementAppComponent } from '../app/textbook-management.component';

beforeEachProviders(() => [TextbookManagementAppComponent]);

describe('App: TextbookManagement', () => {
  it('should create the app',
      inject([TextbookManagementAppComponent], (app: TextbookManagementAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'textbook-management works!\'',
      inject([TextbookManagementAppComponent], (app: TextbookManagementAppComponent) => {
    expect(app.title).toEqual('textbook-management works!');
  }));
});
