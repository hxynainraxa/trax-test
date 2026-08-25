import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

@Component({
  selector: 'app-profile-risk',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile-risk.html',
  styleUrl: './profile-risk.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileRisk extends BasePage {

  protected readonly customerTypes = [
    'Individual',
    'Corporate',
    'Financial Institution',
  ];

  protected readonly profiles = [
    'High risk currencies',
    'New Customer carrying out large transaction',
    'Number of cancelled transactions',
    'Customer sending to many beneficiaries',
    'Customer receiving from high risk country',
    'Customer receiving from multiple countries – inward',
  ];

  protected readonly transactionTypes = [
    'InWard',
    'OutWard',
    'FC',
  ];

  protected form = {
    customerType: 'Individual',
    profile: '',
    transactionType: 'InWard',
  };
}