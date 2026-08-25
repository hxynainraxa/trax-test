import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';


type Tab = 'edit' | 'search';


@Component({
  selector: 'app-source-of-income',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './source-of-income.html',
  styleUrl: './source-of-income.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SourceOfIncome extends BasePage {

  protected activeTab: Tab = 'edit';

  protected readonly sourceCodes = [
    'All',
  ];

  protected readonly riskRatings = [
    'All',
    'Low',
    'Medium',
    'Medium High',
    'High',
  ];

  protected form = this.defaults();

  protected readonly message =
    signal<string | null>(null);


  protected setTab(tab: Tab): void {
    this.activeTab = tab;
    this.reset();
  }


  protected search(): void {
    this.show(
      this.activeTab === 'edit'
        ? 'Source of Income record loaded successfully.'
        : 'Source of Income search completed successfully.',
    );
  }


  protected reset(): void {
    this.form = this.defaults();
  }


  private defaults() {
    return {
      sourceCode: 'All',
      transactionRiskRating: 'All',
      description: '',
      status: 'active',

      createdBy: '',
      createdOn: '',
      modifiedBy: '',
      modifiedOn: '',
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