import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-transaction-type',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './transaction-type.html',

  // Reuse existing Risk Master styling
  styleUrl: '../risk-master-form.scss',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionType extends BasePage {

  protected readonly riskRatings = [
    'All',
    'Low',
    'Medium',
    'Medium High',
    'High',
  ];

  protected readonly transactionFlows = [
    'All',
  ];

  protected form = this.defaults();

  protected readonly message =
    signal<string | null>(null);


  protected search(): void {
    // Replace with API search later.
    this.show(
      'Transaction Type search completed successfully.',
    );
  }


  protected reset(): void {
    this.form = this.defaults();
  }


  private defaults() {
    return {
      transactionType: '',
      transactionTypeName: '',
      riskRating: 'All',

      allowedAmountLimit: null as number | null,
      transactionFlow: 'All',
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