import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService, NotificationsService } from '../../services';

@Component({
  selector: 'app-list-suggestions',
  templateUrl: './list-suggestions.component.html',
  styleUrls: ['./list-suggestions.component.scss']
})
export class ListSuggestionsComponent implements OnInit {
  @Input() suggestions: Array<string> = [];

  public button: string = 'btn-primary';

  constructor(
    private store: Store<AppState>,
    private apisService: ApisService,
    private notificationsService: NotificationsService
  ) {
    this.store
      .select(state => state.theme.button)
      .subscribe((button: string) => {
        this.button = button;
      });
  }

  ngOnInit(): void {}

  async addContact(email: string): Promise<void> {
    const contact = await this.apisService.addContact(email);
    this.notificationsService.publish('ADDED!');
    console.log(contact);
  }
}
