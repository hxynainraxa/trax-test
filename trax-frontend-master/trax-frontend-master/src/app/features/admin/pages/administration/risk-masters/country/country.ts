import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-country-risk',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './country.html',
  styleUrl: './country.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryRisk extends BasePage {

  protected readonly countries = [
    'All',
    'AD - ANDORRA',
    'AE - UNITED ARAB EMIRATES',
    'AF - AFGHANISTAN',
    'AU - AUSTRALIA',
    'BH - BAHRAIN',
    'CA - CANADA',
    'GB - UNITED KINGDOM',
    'IN - INDIA',
    'PK - PAKISTAN',
    'SA - SAUDI ARABIA',
    'US - UNITED STATES',
  ];

  protected readonly types = [
    'All',
    'FATF',
    'NCCT',
    'Bribery & Corruption List',
    'MLTFIST',
    'DRUGS',
    'SANCTIONS',
    'REGULATORY',
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
      'Country search completed successfully.',
    );
  }


  protected reset(): void {
    this.form = this.defaults();
  }


  private defaults() {
    return {
      countryCode: '',
      countryName: 'All',
      type: 'All',
      riskRating: 'All',
      status: 'all',
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