import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { AppState } from '../../app.state';
import { signOut } from '../../store/actions';
import { ApisService, NotificationsService, StorageService } from '../../services';

@Component({
  selector: 'app-card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss']
})
export class CardProfileComponent implements OnInit {
  public faPencilAlt: IconDefinition = faPencilAlt;
  public faTrash: IconDefinition = faTrash;

  @Input() name: string = '';
  @Input() year: number = 0;
  @Input() username: string = '';

  public button: string = 'btn-primary';
  public buttonOutline: string = 'btn-outline-primary';

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private apisService: ApisService,
    private storageService: StorageService,
    private notificationsService: NotificationsService
  ) {
    this.store
      .select(state => state.theme)
      .subscribe((theme: any) => {
        this.button = theme.button;
        this.buttonOutline = theme.buttonOutline;
      });
  }

  ngOnInit(): void {}

  public async updateProfile(): Promise<void> {
    const { name, username } = this;
    const user = await this.apisService.updateProfile({ name, username });
    const { name: updatedName = '', username: updatedUsername = '' } = user;
    this.name = updatedName;
    this.username = updatedUsername;
    this.notificationsService.publish('UPDATED!');
  }

  public async deleteProfile(): Promise<void> {
    const deleteResponse = await this.apisService.deleteProfile();
    console.log('deleteProfile', deleteResponse);
    this.storageService.setCookie('isAuthenticated', 'false');
    this.storageService.setCookie('token', '');
    this.store.dispatch(signOut({ token: '', isAuthenticated: false }));
    this.router.navigateByUrl('/');
    this.notificationsService.publish('DELETED!');
  }
}
