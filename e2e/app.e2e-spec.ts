import { NgconfCdkWorkshopPage } from './app.po';

describe('ngconf-cdk-workshop App', () => {
  let page: NgconfCdkWorkshopPage;

  beforeEach(() => {
    page = new NgconfCdkWorkshopPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
