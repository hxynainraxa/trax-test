import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-delivery-channel-risk',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './delivery-channel.html',

  // Same styling as Country / Service Type
  styleUrl: '../country/country.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class DeliveryChannelRisk extends BasePage {

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
      'Delivery Channel search completed successfully.',
    );
  }


  protected reset(): void {
    this.form = this.defaults();
  }


  private defaults() {
    return {
      deliveryChannel: '',
      riskRating: 'All',
      status: 'active',
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