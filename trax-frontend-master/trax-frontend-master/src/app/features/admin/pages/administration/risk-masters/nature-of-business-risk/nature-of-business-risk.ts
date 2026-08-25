import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-nature-of-business-risk',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './nature-of-business-risk.html',
  styleUrl: '../risk-master-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NatureOfBusinessRisk extends BasePage {

  protected readonly ratings = [
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
      'Nature of Business Risk search completed successfully.',
    );
  }


  protected reset(): void {
    this.form = this.defaults();
  }


  private defaults() {
    return {
      slNo: '',
      natureOfBusiness: '',
      riskScore: 0,
      manualRiskRating: 'All',
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