import { Component, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import * as _ from "lodash";

import { AppState } from "../../app.state";
import { ApisService, UtilsService } from "../../services";

@Component({
  selector: "app-apps-camera",
  templateUrl: "./apps-camera.component.html",
  styleUrls: ["./apps-camera.component.scss"],
})
export class AppsCameraComponent implements OnInit {
  public faCamera: IconDefinition = faCamera;
  public banksInfos: Array<any> = [];
  public loading: boolean = false;
  public filename: string = "Choose File";
  public button: string = "";
  public isMobile: boolean = false;

  constructor(
    private apisService: ApisService,
    private utilsService: UtilsService,
    private store: Store<AppState>
  ) {
    this.store
      .select((state) => state.theme.button)
      .subscribe((button: string) => {
        this.button = button;
      });
  }

  ngOnInit(): void {
    this.isMobile = this.utilsService.detectMobileAndTablet();
  }

  public upload(event: any): void {
    const self = this;
    const file = event.target.files.item(0);
    const { name = "" } = file;
    this.filename = name;
    console.log(file);
    self.loading = true;
    self.banksInfos = [];
    console.log("loading", self.loading);
    this.apisService.upload(file).subscribe(
      (event: any) => {
        console.log("event", event);
        const { body = {} } = event;
        if (!_.isEmpty(body)) {
          const { banksInfos = [] } = body;
          self.banksInfos = banksInfos;
          self.loading = false;
        }
      },
      (error) => {
        self.loading = false;
        console.error(error);
      }
    );
  }

  public copyToClipboard(text: string): void {
    const textArea = document.createElement("textarea");
    textArea.value = text;

    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand("copy");
      const msg = successful ? "Successful" : "Unsuccessful";
      alert(`Copy ${text} to Clipboard: ${msg}`);
    } catch (error) {
      alert(`Oops, unable to copy: ${error.stack}`);
    }

    document.body.removeChild(textArea);
  }
}
