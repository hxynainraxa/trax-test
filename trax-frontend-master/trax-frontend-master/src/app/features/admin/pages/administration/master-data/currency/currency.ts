import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-currency',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './currency.html',
  styleUrl: './currency.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Currency extends BasePage {

  protected readonly countries = [
    'All',
    'AE - United Arab Emirates',
    'AF - Afghanistan',
    'AU - Australia',
    'GB - United Kingdom',
    'IN - India',
    'PK - Pakistan',
    'SA - Saudi Arabia',
    'US - United States',
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


  protected search(): void {
    this.show(
      'Currency search completed successfully.',
    );
  }


  protected reset(): void {
    this.form = this.defaults();
  }


  private defaults() {
    return {
      currencyCode: '',
      currencyName: '',
      country: 'All',
      riskRating: 'All',
      status: 'all',

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