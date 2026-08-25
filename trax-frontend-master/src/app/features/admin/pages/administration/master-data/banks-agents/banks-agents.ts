import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-banks-agents',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './banks-agents.html',
  styleUrl: './banks-agents.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BanksAgents extends BasePage {

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

  protected form = this.defaults();

  protected readonly message =
    signal<string | null>(null);


  protected search(): void {
    // Replace with API search later.
    this.message.set(
      'Banks / Agents search completed successfully.',
    );

    setTimeout(
      () => this.message.set(null),
      5000,
    );
  }


  protected reset(): void {
    this.form = this.defaults();
  }


  private defaults() {
    return {
      code: '',
      name: '',
      address1: '',
      address2: '',
      postBoxNumber: '',
      city: '',
      state: '',
      country: 'All',
      phoneNumber: '',

      faxNumber: '',
      email: '',
      regionName: '',
      bankShortCode: '',
      bankEftCode: '',
      swiftCode: '',

      active: true,
    };
  }
}