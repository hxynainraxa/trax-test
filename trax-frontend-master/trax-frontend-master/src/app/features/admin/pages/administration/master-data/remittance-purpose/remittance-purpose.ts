import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-remittance-purpose',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './remittance-purpose.html',
  styleUrl: './remittance-purpose.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemittancePurpose extends BasePage {

  protected form = this.defaults();

  protected readonly message =
    signal<string | null>(null);


  protected search(): void {
    this.show(
      'Remittance Purpose search completed successfully.',
    );
  }


  protected reset(): void {
    this.form = this.defaults();
  }


  private defaults() {
    return {
      purpose: '',
      description: '',
      remarks: '',

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