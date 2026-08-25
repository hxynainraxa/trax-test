import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-id-type',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './id-type.html',
  styleUrl: './id-type.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdType extends BasePage {

  protected readonly countries = [
    'All',
    'AE - United Arab Emirates',
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
    this.show('ID Type search completed successfully.');
  }


  protected reset(): void {
    this.form = this.defaults();
  }


  private defaults() {
    return {
      idType: '',
      description: '',
      country: 'All',
      remarks: '',
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