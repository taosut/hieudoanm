import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apps-transfer-contacts',
  templateUrl: './apps-transfer-contacts.component.html',
  styleUrls: ['./apps-transfer-contacts.component.scss']
})
export class AppsTransferContactsComponent implements OnInit {
  public suggestions: Array<string> = [];
  constructor() {}

  ngOnInit(): void {}

  public updateSearchResults(searchResult: any) {
    const suggestions = [searchResult.email];
    this.suggestions = suggestions;
  }
}
