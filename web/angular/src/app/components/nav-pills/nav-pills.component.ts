import { Component, OnInit, Input } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';

interface IPill {
  link: string;
  text: string;
}

@Component({
  selector: 'app-nav-pills',
  templateUrl: './nav-pills.component.html',
  styleUrls: ['./nav-pills.component.scss']
})
export class NavPillsComponent implements OnInit {
  @Input() items: Array<IPill> = [];

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
