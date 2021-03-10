import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';

type Type = 'button' | 'submit';

@Component({
  selector: 'app-button-outline',
  templateUrl: './button-outline.component.html',
  styleUrls: ['./button-outline.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonOutlineComponent implements OnInit {
  @Input() click: void;
  @Input() type: Type = 'button';
  @Input() disabled: boolean = false;

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
