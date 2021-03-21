import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import { AppState } from "../../app.state";
import { ApisService, NotificationsService } from "../../services";

@Component({
  selector: "app-apps-qrcodes-form",
  templateUrl: "./apps-qrcodes-form.component.html",
  styleUrls: ["./apps-qrcodes-form.component.scss"],
})
export class AppsQrcodesFormComponent implements OnInit {
  public qrForm: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.email, Validators.required]),
    organization: new FormControl("", [Validators.required]),
  });

  public button: string = "btn-primary";

  constructor(
    private store: Store<AppState>,
    private apisService: ApisService,
    private notificationsService: NotificationsService
  ) {
    this.store
      .select((state) => state.theme)
      .subscribe((theme: any) => {
        this.button = theme.button;
      });
  }

  ngOnInit(): void {}

  public async createQRCode(): Promise<void> {
    const name: string = this.qrForm.get("name")?.value;
    const email: string = this.qrForm.get("email")?.value;
    const organization: string = this.qrForm.get("organization")?.value;
    const payResponse = await this.apisService.createQRCode(
      name,
      email,
      organization
    );
    this.notificationsService.publish("SUCCEED!");
    console.log(payResponse);
  }
}
