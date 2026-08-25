import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-occupation-risk',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './occupation-risk.html',

  /*
   * Reuse the same Risk Master styling.
   */
  styleUrl: '../risk-master-form.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class OccupationRisk extends BasePage {

  protected readonly ratings = [
    'All',
    'Low',
    'Medium',
    'Medium High',
    'High',
  ];

  protected form =
    this.defaults();

  protected readonly message =
    signal<string | null>(null);


  protected search(): void {
    /*
     * Replace with API search later.
     */
    this.show(
      'Occupation Risk search completed successfully.',
    );
  }


  protected reset(): void {
    this.form =
      this.defaults();
  }


  private defaults() {
    return {
      slNo: '',
      occupation: '',
      riskScore: 0,
      manualRiskRating: 'All',
    };
  }


  private show(
    text: string,
  ): void {
    this.message.set(text);

    setTimeout(
      () => this.message.set(null),
      5000,
    );
  }
}