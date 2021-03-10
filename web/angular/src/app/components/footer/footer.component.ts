import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public year: number = new Date().getFullYear();

  public footer: string = 'bg-primary';

  constructor(private store: Store<AppState>) {
    this.store
      .select(state => state.theme.footer)
      .subscribe((footer: string) => {
        this.footer = footer;
      });
  }

  ngOnInit(): void {}
}
