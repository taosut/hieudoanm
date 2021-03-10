import {
  Component,
  OnInit,
  ViewEncapsulation,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { io } from 'socket.io-client';

import { environment } from '../../../environments/environment';
import { ToastComponent } from '../../components/toast/toast.component';
import { NotificationsService } from '../../services';

declare const $: any;

@Component({
  selector: 'app-toast-notifications',
  templateUrl: './toast-notifications.component.html',
  styleUrls: ['./toast-notifications.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ToastNotificationsComponent implements OnInit {
  private socket: any;

  @ViewChild('toastInsert', { read: ViewContainerRef })
  public toastInsert: ViewContainerRef;

  constructor(
    private notificationsService: NotificationsService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.socket = io(environment.baseURL);
  }

  ngOnInit(): void {
    const self = this;
    this.socket.on('x-bank-notification', (data: any) => {
      console.log(data);
    });
    this.notificationsService.notify.subscribe((message: string) => {
      self.notify(message);
    });
  }

  notify(message: string) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ToastComponent);
    this.toastInsert.clear();
    const toastComponent = <ToastComponent>(
      this.toastInsert.createComponent(componentFactory).instance
    );
    const id: string = Date.now().toString();
    toastComponent.id = id;
    toastComponent.message = message;
    setTimeout(() => {
      $(`#${id}`).toast('show');
    });
  }
}
