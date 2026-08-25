import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';


@Component({
  selector: 'app-representative',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './representative.html',
  styleUrl: './representative.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Representative extends BasePage {

  protected readonly nationalityOptions = [
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

  protected readonly representativeTypes = [
    'All',
  ];

  protected form = this.defaultForm();

  protected readonly message =
    signal<string | null>(null);


  protected search(): void {
    // Replace later with API search.
    this.show(
      'Representative search completed successfully.',
    );
  }


  protected reset(): void {
    this.form = this.defaultForm();
    this.message.set(null);
  }


  private defaultForm() {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      mobileNumber: '',
      nationality: 'All',

      membershipNumber: '',
      representativeNumber: '',
      representativeType: 'All',
    };
  }


  private show(
    message: string,
  ): void {
    this.message.set(message);

    setTimeout(
      () => this.message.set(null),
      5000,
    );
  }
}