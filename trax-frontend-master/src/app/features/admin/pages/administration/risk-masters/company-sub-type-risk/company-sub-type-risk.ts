import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-company-sub-type-risk',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './company-sub-type-risk.html',
  styleUrl: '../risk-master-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySubTypeRisk extends BasePage {

  protected form = this.defaults();

  protected readonly message =
    signal<string | null>(null);


  protected search(): void {
    this.show(
      'Company Sub Type Risk search completed successfully.',
    );
  }


  protected reset(): void {
    this.form = this.defaults();
  }


  private defaults() {
    return {
      slNo: '',
      companySubType: '',
      riskScore: 0,
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