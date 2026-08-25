import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import {
  CommonModule,
} from '@angular/common';

import {
  FormsModule,
} from '@angular/forms';

import {
  LucideDynamicIcon,
  LucideRotateCcw,
  LucideSearch,
} from '@lucide/angular';

import {
  BasePage,
} from '@app/core/base/base-page';

import {
  SharedTableComponent,
} from '@shared/components/shared-table/shared-table';

import {
  SharedTableColumn,
} from '@shared/interfaces/shared-table.types';

import {
  countryOptions,
  createCustomerRiskVerificationFilters,
  customerRiskVerificationData,
  CustomerRiskVerificationFilters,
  CustomerRiskVerificationRecord,
  customerTypeOptions,
  genderOptions,
  nationalityOptions,
  residentStatusOptions,
  riskRatingOptions,
} from './customer-risk-verification-data';


// ==================================================
// TABLE ROW
// ==================================================

interface CustomerRiskVerificationTableRow
  extends CustomerRiskVerificationRecord {

  slNo: number;

  customerTypeLabel: string;

  riskRatingLabel: string;

  residentStatusLabel: string;

  countryLabel: string;

  nationalityLabel: string;

  manualRiskLabel: string;

  watchListLabel: string;

  openedDateLabel: string;
}


@Component({
  selector:
    'app-customer-risk-verification',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './customer-risk-verification.html',

  styleUrl:
    './customer-risk-verification.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class CustomerRiskVerification
  extends BasePage
{

  // ==================================================
  // ICONS
  // ==================================================

  protected readonly searchIcon =
    LucideSearch;

  protected readonly resetIcon =
    LucideRotateCcw;


  // ==================================================
  // OPTIONS
  // ==================================================

  protected readonly genders =
    genderOptions;

  protected readonly countries =
    countryOptions;

  protected readonly nationalities =
    nationalityOptions;

  protected readonly customerTypes =
    customerTypeOptions;

  protected readonly riskRatings =
    riskRatingOptions;

  protected readonly residentStatuses =
    residentStatusOptions;


  // ==================================================
  // FILTERS
  // ==================================================

  protected filters:
    CustomerRiskVerificationFilters =
      createCustomerRiskVerificationFilters();


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    CustomerRiskVerificationTableRow[] =
      [];

  protected hasSearched =
    false;


  // ==================================================
  // TABLE COLUMNS
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      CustomerRiskVerificationTableRow
    >[] = [

      {
        key: 'slNo',
        header: 'Sl.No',
        width: '5%',
      },

      {
        key: 'membershipNumber',
        header: 'Membership No.',
        width: '12%',
        sortable: true,
      },

      {
        key: 'fullName',
        header: 'Customer Name',
        width: '18%',
        sortable: true,
      },

      {
        key: 'customerTypeLabel',
        header: 'Customer Type',
        width: '11%',
        sortable: true,
      },

      {
        key: 'riskRatingLabel',
        header: 'Risk Rating',
        width: '10%',
        sortable: true,
      },

      {
        key: 'residentStatusLabel',
        header: 'Resident Status',
        width: '11%',
      },

      {
        key: 'nationalityLabel',
        header: 'Nationality',
        width: '12%',
      },

      {
        key: 'mobileNumber',
        header: 'Mobile No.',
        width: '11%',
      },

      {
        key: 'manualRiskLabel',
        header: 'Manual Risk',
        width: '9%',
      },

      {
        key: 'watchListLabel',
        header: 'Watch List',
        width: '9%',
      },

      {
        key: 'openedDateLabel',
        header: 'Opened Date',
        width: '12%',
      },

    ];


  constructor() {
    super();
  }


  // ==================================================
  // SEARCH
  // ==================================================

  protected search():
    void {

    const filtered =
      customerRiskVerificationData
        .filter(
          record =>
            this.matchesFilters(
              record,
            ),
        );


    this.results =
      this.toRows(
        filtered,
      );


    this.hasSearched =
      true;
  }


  // ==================================================
  // RESET
  // ==================================================

  protected reset():
    void {

    this.filters =
      createCustomerRiskVerificationFilters();


    this.results =
      [];


    this.hasSearched =
      false;
  }


  // ==================================================
  // FILTER
  // ==================================================

  private matchesFilters(
    record:
      CustomerRiskVerificationRecord,
  ): boolean {

    const contains =
      (
        source:
          string,

        filter:
          string,
      ): boolean => {

        if (
          !filter.trim()
        ) {

          return true;
        }


        return source
          .toLowerCase()
          .includes(
            filter
              .trim()
              .toLowerCase(),
          );
      };


    if (
      !contains(
        record.firstName,
        this.filters.firstName,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.middleName,
        this.filters.middleName,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.lastName,
        this.filters.lastName,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.shortName,
        this.filters.shortName,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.fullName,
        this.filters.fullName,
      )
    ) {
      return false;
    }


    if (
      this.filters.gender !==
        'all' &&
      record.gender !==
        this.filters.gender
    ) {
      return false;
    }


    if (
      this.filters.dob &&
      record.dob !==
        this.filters.dob
    ) {
      return false;
    }


    if (
      !contains(
        record.birthPlace,
        this.filters.birthPlace,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.mobileNumber,
        this.filters.mobileNumber,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.residentTelephone,
        this.filters.residentTelephone,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.email,
        this.filters.email,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.idNumber,
        this.filters.idNumber,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.state,
        this.filters.state,
      )
    ) {
      return false;
    }


    if (
      this.filters.country !==
        'all' &&
      record.country !==
        this.filters.country
    ) {
      return false;
    }


    if (
      this.filters.nationality !==
        'all' &&
      record.nationality !==
        this.filters.nationality
    ) {
      return false;
    }


    if (
      !contains(
        record.membershipNumber,
        this.filters.membershipNumber,
      )
    ) {
      return false;
    }


    if (
      this.filters
        .membershipOpenedDate &&
      record.membershipOpenedDate !==
        this.filters.membershipOpenedDate
    ) {
      return false;
    }


    if (
      this.filters.customerType !==
        'all' &&
      record.customerType !==
        this.filters.customerType
    ) {
      return false;
    }


    if (
      this.filters.currentRiskRating !==
        'all' &&
      record.currentRiskRating !==
        this.filters.currentRiskRating
    ) {
      return false;
    }


    if (
      this.filters.residentStatus !==
        'all' &&
      record.residentStatus !==
        this.filters.residentStatus
    ) {
      return false;
    }


    /*
     * Unchecked means:
     * don't use this as a filter.
     *
     * Checked means:
     * return only Manual Risk customers.
     */
    if (
      this.filters.manualRisk &&
      !record.manualRisk
    ) {
      return false;
    }


    /*
     * Same behavior for Watch List.
     */
    if (
      this.filters.watchList &&
      !record.watchList
    ) {
      return false;
    }


    return true;
  }


  // ==================================================
  // TABLE ROWS
  // ==================================================

  private toRows(
    records:
      CustomerRiskVerificationRecord[],
  ): CustomerRiskVerificationTableRow[] {

    return records.map(
      (
        record,
        index,
      ) => ({

        ...record,

        slNo:
          index + 1,

        customerTypeLabel:
          record.customerType ===
            'individual'
            ? 'Individual'
            : 'Corporate',

        riskRatingLabel:
          this.getRiskRatingLabel(
            record.currentRiskRating,
          ),

        residentStatusLabel:
          record.residentStatus ===
            'resident'
            ? 'Resident'
            : 'Non Resident',

        countryLabel:
          this.getOptionLabel(
            countryOptions,
            record.country,
          ),

        nationalityLabel:
          this.getOptionLabel(
            nationalityOptions,
            record.nationality,
          ),

        manualRiskLabel:
          record.manualRisk
            ? 'Yes'
            : 'No',

        watchListLabel:
          record.watchList
            ? 'Yes'
            : 'No',

        openedDateLabel:
          this.formatDate(
            record.membershipOpenedDate,
          ),
      }),
    );
  }


  // ==================================================
  // OPTION LABEL
  // ==================================================

  private getOptionLabel(
    options:
      {
        value: string;
        label: string;
      }[],

    value:
      string,
  ): string {

    return (
      options.find(
        option =>
          option.value ===
          value,
      )?.label ??
      value
    );
  }


  // ==================================================
  // RISK LABEL
  // ==================================================

  private getRiskRatingLabel(
    value:
      CustomerRiskVerificationRecord[
        'currentRiskRating'
      ],
  ): string {

    switch (
      value
    ) {

      case 'low':
        return 'Low';

      case 'medium':
        return 'Medium';

      case 'medium-high':
        return 'Medium High';

      case 'high':
        return 'High';

      default:
        return value;
    }
  }


  // ==================================================
  // DATE
  // ==================================================

  private formatDate(
    value:
      string,
  ): string {

    if (!value) {
      return '—';
    }


    const date =
      new Date(
        `${value}T00:00:00`,
      );


    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {

      return value;
    }


    return date
      .toLocaleDateString();
  }
}