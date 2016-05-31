export class TextbookManagementPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('textbook-management-app h1')).getText();
  }
}
