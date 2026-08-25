import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-service-type-risk',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './service-type.html',

  // Reuse Country Risk styling
  styleUrl: '../country/country.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class ServiceTypeRisk extends BasePage {

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
      'Service Type search completed successfully.',
    );
  }


  protected reset(): void {
    this.form = this.defaults();
  }


  private defaults() {
    return {
      serviceType: '',
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