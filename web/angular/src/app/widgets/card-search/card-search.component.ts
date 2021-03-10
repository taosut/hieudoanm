import { Component, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { ApisService } from '../../services';

@Component({
  selector: 'app-card-search',
  templateUrl: './card-search.component.html',
  styleUrls: ['./card-search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardSearchComponent implements OnInit {
  public searchForm: FormGroup = new FormGroup({
    query: new FormControl('', [Validators.required])
  });

  public faSearch: IconDefinition = faSearch;
  public button: string = 'btn-primary';
  public buttonOutline: string = 'btn-outline-primary';

  @Output() onSearchResultsChanged = new EventEmitter<any>();

  public loading: boolean = false;
  public completed: boolean = false;
  public searchResults: Array<any> = [];

  constructor(private store: Store<AppState>, private apisService: ApisService) {
    this.store
      .select(state => state.theme)
      .subscribe((theme: any) => {
        this.button = theme.button;
        this.buttonOutline = theme.buttonOutline;
      });
  }

  ngOnInit(): void {}

  public onChange(): void {
    this.completed = false;
  }

  public async search(): Promise<void> {
    const query: string = this.searchForm.get('query')?.value;
    this.loading = true;
    this.completed = false;
    const searchResults: Array<any> = await this.apisService.search(query);
    this.loading = false;
    this.completed = true;
    this.searchResults = searchResults;
  }

  public choose(searchResult: any): void {
    this.completed = false;
    this.searchResults = [];
    this.onSearchResultsChanged.emit(searchResult);
  }
}
