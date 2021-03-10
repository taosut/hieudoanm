import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faCreditCard, faShieldAlt, faDollarSign, faRedo } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';

@Component({
  selector: 'app-docs-home',
  templateUrl: './docs-home.component.html',
  styleUrls: ['./docs-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DocsHomeComponent implements OnInit {
  public faCreditCard: IconDefinition = faCreditCard;
  public faShieldAlt: IconDefinition = faShieldAlt;
  public faDollarSign: IconDefinition = faDollarSign;
  public faRedo: IconDefinition = faRedo;

  public backgroundCover: string = 'bg-primary';

  constructor(private store: Store<AppState>) {
    this.store
      .select(state => state.theme.backgroundCover)
      .subscribe((backgroundCover: string) => {
        this.backgroundCover = backgroundCover;
      });
  }

  ngOnInit(): void {}
}
