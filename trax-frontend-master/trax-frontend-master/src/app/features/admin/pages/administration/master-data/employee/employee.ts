import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { BasePage } from '@app/core/base/base-page';

type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'select';

interface Field {
  key: string;
  label: string;
  type?: FieldType;
  options?: string[];
}

@Component({
  selector: 'app-employee',

  standalone: true,

  imports: [
    FormsModule,
    NgTemplateOutlet,
  ],

  templateUrl: './employee.html',

  styleUrl: './employee.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class Employee extends BasePage {
  protected readonly all = ['All'];

  protected readonly genderOptions = [
    'All',
    'Male',
    'Female',
  ];

  protected readonly riskOptions = [
    'All',
    'Low',
    'Medium',
    'Medium High',
    'High',
  ];

  protected readonly statusOptions = [
    'ALL',
    'Active',
    'Inactive',
  ];

  protected readonly residentOptions = [
    'All',
    'Resident',
    'Non Resident',
  ];

  protected readonly branchOptions = [
    'All',
    'Head Office',
    'Deira Branch',
    'Al Ain Branch',
  ];

  // ==================================================
  // LEFT SIDE
  // ==================================================

  protected readonly leftFields: Field[] = [
    { key: 'salutation', label: 'Salutation' },
    { key: 'firstName', label: 'First Name' },
    { key: 'middleName', label: 'Middle Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'shortName', label: 'Short Name' },
    { key: 'fullName', label: 'Full Name' },

    {
      key: 'gender',
      label: 'Gender',
      type: 'select',
      options: this.genderOptions,
    },

    {
      key: 'dob',
      label: 'DOB',
      type: 'date',
    },

    { key: 'birthPlace', label: 'Birth Place' },
    { key: 'mobileNumber', label: 'Mobile Num.' },
    { key: 'residentTel', label: 'Resident Tel Num.' },
    { key: 'email', label: 'Email Id' },
    { key: 'state', label: 'State' },
  ];


  // ==================================================
  // RIGHT SIDE
  // ==================================================

  protected readonly rightFields: Field[] = [
    {
      key: 'country',
      label: 'Country',
      type: 'select',
      options: this.all,
    },

    {
      key: 'nationality',
      label: 'Nationality',
      type: 'select',
      options: this.all,
    },

    {
      key: 'membershipNumber',
      label: 'Membership Number',
    },

    {
      key: 'membershipBranch',
      label: 'Membership Branch',
      type: 'select',
      options: this.branchOptions,
    },

    {
      key: 'membershipNoInBranch',
      label: 'Membership No In Branch',
    },

    {
      key: 'membershipOpenedDate',
      label: 'Membership Opened Date',
      type: 'date',
    },

    {
      key: 'employeeCode',
      label: 'Employee Code',
    },

    {
      key: 'riskRating',
      label: 'Risk Rating',
      type: 'select',
      options: this.riskOptions,
    },

    {
      key: 'status',
      label: 'Status',
      type: 'select',
      options: this.statusOptions,
    },

    {
      key: 'residentStatus',
      label: 'Resident Status',
      type: 'select',
      options: this.residentOptions,
    },

    {
      key: 'thresholdLimit',
      label: 'Threshold Limit',
      type: 'number',
    },

    {
      key: 'createdBy',
      label: 'Created By',
    },

    {
      key: 'createdOn',
      label: 'Created On',
      type: 'date',
    },

    {
      key: 'modifiedBy',
      label: 'Modified By',
    },

    {
      key: 'modifiedOn',
      label: 'Modified On',
      type: 'date',
    },
  ];


  // ==================================================
  // FORM
  // ==================================================

  protected form:
    Record<string, string | number> =
      this.createForm();


  protected readonly message =
    signal<string | null>(null);


  // ==================================================
  // SEARCH
  // ==================================================

  protected search(): void {
    /*
     * Replace later with Employee API/search.
     */
    this.message.set(
      'Employee search applied successfully.',
    );

    setTimeout(
      () => this.message.set(null),
      5000,
    );
  }


  // ==================================================
  // RESET
  // ==================================================

  protected reset(): void {
    this.form =
      this.createForm();
  }


  private createForm():
    Record<string, string | number> {

    const form:
      Record<string, string | number> = {};

    [
      ...this.leftFields,
      ...this.rightFields,
    ].forEach(field => {
      form[field.key] =
        field.key === 'thresholdLimit'
          ? 0
          : field.type === 'select'
            ? field.options?.[0] ?? ''
            : '';
    });

    return form;
  }
} 