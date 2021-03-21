import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ApisService, NotificationsService } from "../../services";

@Component({
  selector: "app-apps-qrcodes-info",
  templateUrl: "./apps-qrcodes-info.component.html",
  styleUrls: ["./apps-qrcodes-info.component.scss"],
})
export class AppsQrcodesInfoComponent implements OnInit {
  public loading: boolean = true;
  public attendant: any = {};

  constructor(
    private apisService: ApisService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const self = this;
    this.activatedRoute.queryParams.subscribe(async (params: any) => {
      const { id } = params;
      self.loading = true;
      const attendant = await this.apisService.getQRCode(id);
      self.attendant = attendant;
      self.loading = false;
    });
  }
}
