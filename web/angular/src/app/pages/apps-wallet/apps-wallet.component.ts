import { Component, OnInit } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { faUniversity, faCreditCard, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { ApisService, UtilsService } from '../../services';

interface IBank {
  code: string;
  name: string;
  number: string;
}

@Component({
  selector: 'app-apps-wallet',
  templateUrl: './apps-wallet.component.html',
  styleUrls: ['./apps-wallet.component.scss']
})
export class AppsWalletComponent implements OnInit {
  public faPlus: IconDefinition = faPlus;
  public faUniversity: IconDefinition = faUniversity;
  public faCreditCard: IconDefinition = faCreditCard;

  public banks: Array<IBank> = [];
  public balance: string = '';

  constructor(private apisService: ApisService, private utilsService: UtilsService) {}

  async ngOnInit(): Promise<void> {
    this.banks = await this.getBanks();
  }

  public updateBanks(banks: Array<IBank>): void {
    this.banks = banks;
  }

  public updateBalance(balance: string) {
    this.balance = balance;
  }

  public async getBanks(): Promise<Array<IBank>> {
    const user = await this.apisService.getProfile();
    const { banks = [] } = user;
    return banks;
  }
}
