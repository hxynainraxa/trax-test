import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

type Tab = 'edit' | 'search';
type Status = 'all' | 'active' | 'inactive';

@Component({
  selector: 'app-exchange-branches',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './exchange-branches.html',
  styleUrl: './exchange-branches.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExchangeBranches extends BasePage {

  protected activeTab: Tab = 'search';

  protected readonly countries = [
    'All',
    'AE - United Arab Emirates',
    'AF - Afghanistan',
    'AU - Australia',
    'BH - Bahrain',
    'GB - United Kingdom',
    'IN - India',
    'PK - Pakistan',
    'SA - Saudi Arabia',
    'US - United States',
  ];

  protected form = this.createForm('search');

  protected readonly message =
    signal<string | null>(null);


  protected setTab(tab: Tab): void {
    this.activeTab = tab;
    this.form = this.createForm(tab);
  }


  protected search(): void {
    this.show(
      this.activeTab === 'edit'
        ? 'Branch loaded for editing.'
        : 'Branch search completed successfully.',
    );
  }


  protected reset(): void {
    this.form =
      this.createForm(this.activeTab);
  }


  private createForm(tab: Tab) {
    return {
      branchCode: '',
      branchName: '',
      address1: '',
      address2: '',
      country:
        tab === 'edit'
          ? ''
          : 'All',
      state: '',
      city: '',

      postBoxNumber: '',
      telephoneNumber: '',
      faxNumber: '',
      email: '',
      openDate: '',
      contactPerson: '',

      status:
        (tab === 'edit'
          ? 'active'
          : 'all') as Status,
    };
  }


  private show(text: string): void {
    this.message.set(text);

    setTimeout(
      () => this.message.set(null),
      5000,
    );
  }
}