import { Component, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss']
})
export class LinkComponent implements OnInit {
  @Input() href: string = '';
  @Input() routerLink: string = '';

  public linkColor: string = 'text-primary';

  constructor(private store: Store<AppState>) {
    this.store
      .select(state => state.theme.linkColor)
      .subscribe((linkColor: string) => {
        this.linkColor = linkColor;
      });
  }

  ngOnInit(): void {}
}
