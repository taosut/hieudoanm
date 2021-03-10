import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  public spinner: string = 'text-primary';

  constructor(private store: Store<AppState>) {
    this.store
      .select(state => state.theme.spinner)
      .subscribe((spinner: string) => {
        this.spinner = spinner;
      });
  }

  ngOnInit(): void {}
}
