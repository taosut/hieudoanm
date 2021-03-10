import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { StorageService } from '../../services';
import { switchTheme } from '../../store/actions';

@Component({
  selector: 'app-docs-about',
  templateUrl: './docs-about.component.html',
  styleUrls: ['./docs-about.component.scss']
})
export class DocsAboutComponent implements OnInit {
  public themes: Array<string> = ['red', 'blue', 'dark', 'cyan', 'green', 'yellow'].sort();

  public buttonOutline: string = 'btn-outline-primary';
  public linkColor: string = 'text-primary';

  constructor(private store: Store<AppState>, private storageService: StorageService) {
    this.store
      .select(state => state.theme)
      .subscribe((theme: any) => {
        this.buttonOutline = theme.buttonOutline;
        this.linkColor = theme.linkColor;
      });
  }

  ngOnInit(): void {}

  public async change(theme: string): Promise<void> {
    this.storageService.setCookie('theme', theme);
    this.store.dispatch(switchTheme({ theme }));
  }
}
