import { element, by } from 'protractor';
import { BaseSipModalPage } from './baseSipModalPage.po';

export class DocumentPage extends BaseSipModalPage {
  constructor(public articleNumber: number) {
    super();
  }

  goToPage() {
    this.navigateTo(`/document/${this.articleNumber}`);
  }
}