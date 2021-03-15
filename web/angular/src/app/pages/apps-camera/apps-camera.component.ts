import { Component, OnInit } from "@angular/core";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Store } from "@ngrx/store";
import * as _ from "lodash";
import * as Tesseract from "tesseract.js";

import { AppState } from "../../app.state";
import { ApisService, UtilsService } from "../../services";

const banks: Array<any> = [
  { names: ["abbank"] },
  { names: ["acb"], prefixes: ["20", "24"] },
  { names: ["agribank", "agri"], prefixes: ["130", "490", "318"], length: 13 },
  { names: ["baovietbank", "bvb"] },
  { names: ["bidv"], prefixes: ["581", "125", "601", "213"], length: 14 },
  { names: ["cbbank"] },
  { names: ["dongabank"] },
  { names: ["eximbank"] },
  { names: ["gpbank", "gpb"] },
  { names: ["hdbank", "hdb"] },
  { names: ["kienlongbank"] },
  { names: ["lienvietpostbank", "lpb"] },
  { names: ["mbbank"], prefixes: ["068", "0801", "0050"], length: 13 },
  { names: ["msb"] },
  { names: ["namabank"] },
  { names: ["ncb"] },
  { names: ["ocb"] },
  { names: ["oceanbank"] },
  { names: ["pgbank"] },
  { names: ["pvcombank"] },
  {
    names: ["sacombank"],
    prefixes: ["020", "5611", "0400", "1234"],
    length: 12,
  },
  { names: ["saigonbank"] },
  { names: ["scb"] },
  { names: ["seabank"] },
  { names: ["shb"] },
  {
    names: ["techcombank"],
    prefixes: ["102", "196", "140", "191", "1903"],
    length: 14,
  },
  { names: ["tpbank"], prefixes: ["020"] },
  { names: ["uob"] },
  { names: ["vib"], prefixes: ["601", "025"], length: 15 },
  { names: ["vietabank"] },
  { names: ["vietbank"] },
  { names: ["vietcapitalbank"] },
  {
    names: ["vietcombank", "vcb"],
    prefixes: ["007", "004", "0491", "001"],
    length: 13,
  },
  { names: ["vietinbank"], prefixes: ["10"], length: 12 },
  { names: ["vpbank"], prefixes: ["15"] },
];

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

  public async processFiles(event: any) {
    const files = event.target.files;

    console.log("files", files);

    const [file = {}] = files;
    console.log("file", file);
    if (!file) {
      return alert("NO FILE");
    }

    this.loading = true;
    const text: string = await this.getTextFromImage(file);
    this.banksInfos = await this.getBanksInfos(text);
    this.loading = false;
  }

  private async getTextFromImage(file: File): Promise<string> {
    const self = this;
    return new Promise((resolve) => {
      Tesseract.recognize(file, "eng", {
        logger: (process) => console.log("process", process),
      })
        .then(({ data: { text } }) => {
          return resolve(text);
        })
        .catch((error: any) => {
          console.error(error);
          return resolve("");
        });
    });
  }

  private getBanksInfos(text: string): Array<Record<string, any>> {
    console.log("text", text);
    const lines: Array<string> = text
      .split("\n")
      .map((line: string) => line.trim().toLowerCase())
      .filter((line: string) => line);
    console.log("lines", lines);
    const allNumbers: Array<Array<string>> = lines.map((line: string) => {
      const numbers = line
        .replace(/\D/g, " ")
        .split("  ")
        .map((number: string) => number.trim());
      return numbers;
    });
    const bankNumbers = _.flattenDeep(allNumbers)
      .filter((line: string) => !isNaN(parseInt(line, 10)))
      .filter((line: string) => line.length > 8);
    const bankNames: Array<string> = lines
      .map((line: string) => {
        const filterBanks = banks.filter((bank: any) => {
          const { names = [] } = bank;
          return names.some((name: string) => line.includes(name));
        });
        const [first = { names: [] }] = filterBanks;
        const { names = [] } = first;
        const [name = ""] = names;
        return name.toLowerCase();
      })
      .filter((name: string) => name);
    console.log("bankNumbers", bankNumbers);
    console.log("bankNames", bankNames);
    const length: number = bankNumbers.length;
    const banksInfos = [];
    for (let i = 0; i < length; i++) {
      const name: string = bankNames[i] || "";
      const number: string = bankNumbers[i] || "";
      if (!name || !number) continue;
      banksInfos.push({ name, number });
    }
    console.log("banksInfos", banksInfos);
    return banksInfos;
  }

  public async uploadBankImage(event: any): Promise<void> {
    const self = this;
    const file = event.target.files.item(0);
    const { name = "" } = file;
    this.filename = name;
    console.log(file);
    self.loading = true;
    self.banksInfos = [];
    const { banksInfos = [] } = await this.apisService.uploadBankImage(file);
    self.loading = false;
    self.banksInfos = banksInfos;
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
