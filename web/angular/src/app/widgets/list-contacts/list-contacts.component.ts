import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService } from '../../services';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.scss']
})
export class ListContactsComponent implements OnInit {
  public loading: boolean = false;
  public contacts: Array<any> = [];

  public buttonOutline: string = 'btn-outline-primary';

  constructor(private store: Store<AppState>, private apisService: ApisService) {
    this.store
      .select(state => state.theme.buttonOutline)
      .subscribe((buttonOutline: string) => {
        this.buttonOutline = buttonOutline;
      });
  }

  async ngOnInit(): Promise<void> {
    this.contacts = await this.getContacts();
  }

  public async getContacts(): Promise<Array<any>> {
    this.loading = true;
    const contacts = await this.apisService.getContacts();
    this.loading = false;
    return contacts;
  }
}
