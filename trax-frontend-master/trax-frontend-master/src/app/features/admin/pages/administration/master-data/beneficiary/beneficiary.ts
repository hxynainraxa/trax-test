import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {
  FormsModule,
} from '@angular/forms';

import {
  BasePage,
} from '@app/core/base/base-page';


type BeneficiaryTab =
  | 'personal'
  | 'bank'
  | 'id-details';


@Component({
  selector: 'app-beneficiary',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './beneficiary.html',
  styleUrl: './beneficiary.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Beneficiary extends BasePage {

  protected activeTab:
    BeneficiaryTab = 'personal';

  protected message = '';

  protected readonly genderOptions = [
    'All',
    'Male',
    'Female',
  ];

  protected readonly branchOptions = [
    'All',
    'Head Office',
    'Deira Branch',
    'Al Ain Branch',
  ];

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

  protected readonly idTypeOptions = [
    'All',
    'Passport',
    'Emirates ID',
    'National ID',
    'Driving License',
  ];

  protected form =
    this.defaultForm();


  protected setTab(
    tab: BeneficiaryTab,
  ): void {
    this.activeTab = tab;
    this.message = '';
  }


  protected search(): void {
    this.message =
      'Beneficiary search completed successfully.';

    setTimeout(
      () => this.message = '',
      5000,
    );
  }


  protected reset(): void {
    this.form =
      this.defaultForm();

    this.message = '';
  }


  private defaultForm() {
    return {
      salutation: '',
      firstName: '',
      middleName: '',
      lastName: '',
      fullName: '',
      beneficiaryNumber: '',
      gender: 'All',
      dob: '',
      birthPlace: '',
      mobileNumber: '',
      nationality: 'All',

      membershipNumber: '',
      membershipBranch: 'All',
      membershipNoInBranch: '',
      createdBy: '',
      createdOn: '',
      verifiedBy: '',
      verifiedOn: '',
      modifiedBy: '',
      modifiedOn: '',

      bankName: '',
      bankBranchName: '',
      bankAccountType: '',
      accountNumber: '',

      idType: 'All',
      idNumber: '',
      idIssuedPlace: '',
      idIssuedDate: '',
      idExpiryDate: '',
    };
  }
}