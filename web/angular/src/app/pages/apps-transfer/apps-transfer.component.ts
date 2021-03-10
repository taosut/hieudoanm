import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apps-transfer',
  templateUrl: './apps-transfer.component.html',
  styleUrls: ['./apps-transfer.component.scss']
})
export class AppsTransferComponent implements OnInit {
  public items: Array<any> = [
    { text: 'Send', link: 'pay' },
    { text: 'Request', link: 'request' },
    { text: 'Contacts', link: 'contacts' }
  ];

  constructor() {}

  ngOnInit(): void {}
}
