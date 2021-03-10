import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  public badge: string = 'badge-primary';

  constructor(private store: Store<AppState>) {
    this.store
      .select(state => state.theme.badge)
      .subscribe((badge: string) => {
        this.badge = badge;
      });
  }

  ngOnInit(): void {}
}
