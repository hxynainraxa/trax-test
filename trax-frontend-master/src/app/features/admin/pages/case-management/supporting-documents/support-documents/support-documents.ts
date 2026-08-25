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
  createSupportDocumentFilters,
  SupportDocumentFilters,
  SupportDocumentRecord,
  supportBranchOptions,
  supportDocumentRecords,
  supportTransactionTypeOptions,
} from './support-documents-data';


// ==================================================
// TABLE ROW
// ==================================================

interface SupportDocumentTableRow
  extends SupportDocumentRecord {

  slNo:
    number;

  branchLabel:
    string;

  transactionTypeLabel:
    string;

  violationTypeLabel:
    string;

  violationDateLabel:
    string;

  statusLabel:
    string;
}


@Component({
  selector:
    'app-support-documents',

  standalone:
    true,

  imports: [
    CommonModule,
    FormsModule,
    LucideDynamicIcon,
    SharedTableComponent,
  ],

  templateUrl:
    './support-documents.html',

  styleUrl:
    './support-documents.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush,
})
export class SupportDocuments
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
    supportBranchOptions;


  protected readonly transactionTypes =
    supportTransactionTypeOptions;


  // ==================================================
  // FILTER
  // ==================================================

  protected filters:
    SupportDocumentFilters =
      createSupportDocumentFilters();


  // ==================================================
  // RESULTS
  // ==================================================

  protected results:
    SupportDocumentTableRow[] = [];


  protected hasSearched =
    false;


  // ==================================================
  // DATE ERROR
  // ==================================================

  protected dateError =
    '';


  // ==================================================
  // TABLE
  // ==================================================

  protected readonly columns:
    SharedTableColumn<
      SupportDocumentTableRow
    >[] = [

      {
        key:
          'slNo',

        header:
          'Sl.No',

        width:
          '5%',
      },

      {
        key:
          'referenceNumber',

        header:
          'Reference No.',

        width:
          '13%',

        sortable:
          true,
      },

      {
        key:
          'membershipNumber',

        header:
          'Membership No.',

        width:
          '12%',

        sortable:
          true,
      },

      {
        key:
          'customerName',

        header:
          'Customer Name',

        width:
          '16%',

        sortable:
          true,
      },

      {
        key:
          'branchLabel',

        header:
          'Branch',

        width:
          '11%',

        sortable:
          true,
      },

      {
        key:
          'transactionTypeLabel',

        header:
          'Transaction Type',

        width:
          '18%',
      },

      {
        key:
          'violationTypeLabel',

        header:
          'Violation Type',

        width:
          '13%',
      },

      {
        key:
          'documentName',

        header:
          'Support Document',

        width:
          '16%',
      },

      {
        key:
          'violationDateLabel',

        header:
          'Violation Date',

        width:
          '12%',

        sortable:
          true,
      },

      {
        key:
          'statusLabel',

        header:
          'Status',

        width:
          '10%',

        sortable:
          true,
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


    const filtered =
      supportDocumentRecords
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
      createSupportDocumentFilters();


    this.results =
      [];


    this.hasSearched =
      false;


    this.dateError =
      '';
  }


  // ==================================================
  // FILTER RECORD
  // ==================================================

  private matchesFilters(
    record:
      SupportDocumentRecord,
  ): boolean {

    // ================================================
    // BRANCH
    // ================================================

    if (
      this.filters.branch !==
        'all' &&
      record.branch !==
        this.filters.branch
    ) {

      return false;
    }


    // ================================================
    // REFERENCE
    // ================================================

    const reference =
      this.filters
        .referenceNumber
        .trim()
        .toLowerCase();


    if (
      reference &&
      !record
        .referenceNumber
        .toLowerCase()
        .includes(
          reference,
        )
    ) {

      return false;
    }


    // ================================================
    // FROM DATE
    // ================================================

    if (
      this.filters.fromDate &&
      record.violationDate <
        this.filters.fromDate
    ) {

      return false;
    }


    // ================================================
    // TO DATE
    // ================================================

    if (
      this.filters.toDate &&
      record.violationDate >
        this.filters.toDate
    ) {

      return false;
    }


    // ================================================
    // TRANSACTION TYPE
    // ================================================

    if (
      this.filters.transactionType !==
        'all' &&
      record.transactionType !==
        this.filters.transactionType
    ) {

      return false;
    }


    // ================================================
    // VIOLATION TYPE
    // ================================================

    if (
      record.violationType !==
        this.filters.violationType
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
      SupportDocumentRecord[],
  ): SupportDocumentTableRow[] {

    return records.map(
      (
        record,
        index,
      ) => {

        const branch =
          supportBranchOptions
            .find(
              item =>
                item.value ===
                record.branch,
            );


        const transactionType =
          supportTransactionTypeOptions
            .find(
              item =>
                item.value ===
                record.transactionType,
            );


        return {

          ...record,

          slNo:
            index + 1,

          branchLabel:
            branch?.label ??
            record.branch,

          transactionTypeLabel:
            transactionType?.label ??
            record.transactionType,

          violationTypeLabel:
            this.getViolationTypeLabel(
              record.violationType,
            ),

          violationDateLabel:
            this.formatDate(
              record.violationDate,
            ),

          statusLabel:
            this.getStatusLabel(
              record.status,
            ),
        };
      },
    );
  }


  // ==================================================
  // VIOLATION TYPE
  // ==================================================

  private getViolationTypeLabel(
    type:
      SupportDocumentRecord[
        'violationType'
      ],
  ): string {

    switch (
      type
    ) {

      case 'blacklist':
        return 'Black List Violation';

      case 'rule':
        return 'Rule Violation';

      case 'case':
        return 'Case Violation';

      default:
        return type;
    }
  }


  // ==================================================
  // STATUS
  // ==================================================

  private getStatusLabel(
    status:
      SupportDocumentRecord[
        'status'
      ],
  ): string {

    switch (
      status
    ) {

      case 'pending':
        return 'Pending';

      case 'submitted':
        return 'Submitted';

      case 'reviewed':
        return 'Reviewed';

      default:
        return status;
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