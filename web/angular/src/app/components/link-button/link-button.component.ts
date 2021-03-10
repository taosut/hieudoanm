import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';

@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LinkButtonComponent implements OnInit {
  @Input() href: string = '';
  @Input() routerLink: string = '';

  public buttonOutline: string = 'btn-outline-primary';

  constructor(private store: Store<AppState>) {
    this.store
      .select(state => state.theme.buttonOutline)
      .subscribe((buttonOutline: string) => {
        this.buttonOutline = buttonOutline;
      });
  }

  ngOnInit(): void {}
}
