import { Component, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { ApisService } from "../../services/apis.service";

@Component({
  selector: "app-apps-camera",
  templateUrl: "./apps-camera.component.html",
  styleUrls: ["./apps-camera.component.scss"],
})
export class AppsCameraComponent implements OnInit {
  public faCamera: IconDefinition = faCamera;
  public banksInfos: Array<any> = [];

  constructor(private apisService: ApisService) {}

  ngOnInit(): void {}

  public upload(event: any): void {
    const self = this;
    const file = event.target.files.item(0);
    console.log(file);
    this.apisService.upload(file).subscribe(
      (event: any) => {
        console.log(event);
        const { body = {} } = event;
        const { banksInfos = [] } = body;
        self.banksInfos = banksInfos;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
