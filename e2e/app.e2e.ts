import { TextbookManagementPage } from './app.po';

describe('textbook-management App', function() {
  let page: TextbookManagementPage;

  beforeEach(() => {
    page = new TextbookManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('textbook-management works!');
  });
});
