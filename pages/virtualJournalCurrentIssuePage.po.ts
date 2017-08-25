import { element, by } from 'protractor';
import { VirtualJournalPublication } from "./../data/virtualJournals.data";
import { BaseSipModalPage } from './baseSipModalPage.po';

export class VirtualJournalCurrentIssuePage extends BaseSipModalPage {
  constructor(public publicationSlug: VirtualJournalPublication) {
    super();
  }

  goToPage() {
    this.navigateTo(`/virtual-journals/${this.publicationSlug}/issue/current/`);
  }
}