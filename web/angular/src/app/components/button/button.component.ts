import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';

type Type = 'button' | 'submit';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent implements OnInit {
  @Input() click: void | Promise<void> = undefined;
  @Input() type: Type = 'button';
  @Input() disabled: boolean = false;
  @Input() dataToggle: string = '';
  @Input() dataTarget: string = '';
  @Input() icon: any;

  public button: string = 'btn-primary';

  constructor(private store: Store<AppState>) {
    this.store
      .select(state => state.theme.button)
      .subscribe((button: string) => {
        this.button = button;
      });
  }

  ngOnInit(): void {}
}
