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
  createFollowupSupportFilters,
  FollowupSupportFilters,
  FollowupSupportRecord,
  followupBranchOptions,
  followupNationalityOptions,
  followupSupportRecords,
  followupTransactionTypeOptions,
  FollowupSupportOption,
} from './followup-support-documents-data';


interface FollowupSupportTableRow
  extends FollowupSupportRecord {

  slNo: number;

  branchLabel: string;

  nationalityLabel: string;

  transactionTypeLabel: string;

  violationTypeLabel: string;

  dateLabel: string;

  statusLabel: string;
}


@Component({
  selector:
    'app-followup-support-documents',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './followup-support-documents.html',

  styleUrl:
    './followup-support-documents.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class FollowupSupportDocuments
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

  protected readonly branches =
    followupBranchOptions;

  protected readonly nationalities =
    followupNationalityOptions;

  protected readonly transactionTypes =
    followupTransactionTypeOptions;


  // ==================================================
  // FILTER
  // ==================================================

  protected filters:
    FollowupSupportFilters =
      createFollowupSupportFilters();


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    FollowupSupportTableRow[] = [];

  protected hasSearched =
    false;

  protected dateError =
    '';


  // ==================================================
  // TABLE
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      FollowupSupportTableRow
    >[] = [

      {
        key: 'slNo',
        header: 'Sl.No',
        width: '5%',
      },

      {
        key: 'referenceNumber',
        header: 'Reference No.',
        width: '13%',
        sortable: true,
      },

      {
        key: 'membershipCard',
        header: 'Membership Card',
        width: '12%',
        sortable: true,
      },

      {
        key: 'memberId',
        header: 'Member ID',
        width: '10%',
      },

      {
        key: 'customerName',
        header: 'Customer Name',
        width: '16%',
        sortable: true,
      },

      {
        key: 'nationalityLabel',
        header: 'Nationality',
        width: '12%',
      },

      {
        key: 'branchLabel',
        header: 'Branch',
        width: '11%',
      },

      {
        key: 'transactionTypeLabel',
        header: 'Transaction Type',
        width: '17%',
      },

      {
        key: 'violationTypeLabel',
        header: 'Violation Type',
        width: '13%',
      },

      {
        key: 'dateLabel',
        header: 'Date',
        width: '11%',
      },

      {
        key: 'statusLabel',
        header: 'Status',
        width: '9%',
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

    this.dateError =
      '';


    if (
      this.filters.fromDate &&
      this.filters.toDate &&
      this.filters.fromDate >
        this.filters.toDate
    ) {

      this.dateError =
        'To Date cannot be earlier than From Date.';

      this.results =
        [];

      this.hasSearched =
        false;

      return;
    }


    const records =
      followupSupportRecords.filter(
        record =>
          this.matchesFilters(
            record,
          ),
      );


    this.results =
      this.toRows(
        records,
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
      createFollowupSupportFilters();


    this.results =
      [];


    this.hasSearched =
      false;


    this.dateError =
      '';
  }


  // ==================================================
  // FILTER
  // ==================================================

  private matchesFilters(
    record:
      FollowupSupportRecord,
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
      this.filters.branch !==
        'all' &&
      record.branch !==
        this.filters.branch
    ) {
      return false;
    }


    if (
      !contains(
        record.referenceNumber,
        this.filters.referenceNumber,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.membershipCard,
        this.filters.membershipCard,
      )
    ) {
      return false;
    }


    if (
      !contains(
        record.memberId,
        this.filters.memberId,
      )
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
      this.filters.transactionType !==
        'all' &&
      record.transactionType !==
        this.filters.transactionType
    ) {
      return false;
    }


    if (
      record.violationType !==
        this.filters.violationType
    ) {
      return false;
    }


    const recordDate =
      this.filters.useValueDate
        ? record.valueDate
        : record.violationDate;


    if (
      this.filters.fromDate &&
      recordDate <
        this.filters.fromDate
    ) {
      return false;
    }


    if (
      this.filters.toDate &&
      recordDate >
        this.filters.toDate
    ) {
      return false;
    }


    return true;
  }


  // ==================================================
  // TABLE ROW
  // ==================================================

  private toRows(
    records:
      FollowupSupportRecord[],
  ): FollowupSupportTableRow[] {

    return records.map(
      (
        record,
        index,
      ) => ({

        ...record,

        slNo:
          index + 1,

        branchLabel:
          this.getOptionLabel(
            followupBranchOptions,
            record.branch,
          ),

        nationalityLabel:
          this.getOptionLabel(
            followupNationalityOptions,
            record.nationality,
          ),

        transactionTypeLabel:
          this.getOptionLabel(
            followupTransactionTypeOptions,
            record.transactionType,
          ),

        violationTypeLabel:
          this.getViolationLabel(
            record.violationType,
          ),

        dateLabel:
          this.formatDate(
            this.filters.useValueDate
              ? record.valueDate
              : record.violationDate,
          ),

        statusLabel:
          this.getStatusLabel(
            record.status,
          ),
      }),
    );
  }


  private getOptionLabel(
    options:
      FollowupSupportOption[],

    value:
      string,
  ): string {

    return (
      options.find(
        option =>
          option.value === value,
      )?.label ??
      value
    );
  }


  private getViolationLabel(
    value:
      FollowupSupportRecord[
        'violationType'
      ],
  ): string {

    switch (
      value
    ) {

      case 'blacklist':
        return 'Black List Violation';

      case 'rule':
        return 'Rule Violation';

      case 'case':
        return 'Case Violation';

      default:
        return value;
    }
  }


  private getStatusLabel(
    value:
      FollowupSupportRecord[
        'status'
      ],
  ): string {

    switch (
      value
    ) {

      case 'pending':
        return 'Pending';

      case 'submitted':
        return 'Submitted';

      case 'reviewed':
        return 'Reviewed';

      default:
        return value;
    }
  }


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